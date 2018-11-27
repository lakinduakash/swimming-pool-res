import {ChangeDetectionStrategy, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import * as firebase from 'firebase';
import {AdminService} from '../services/admin.service';
import {Chart} from 'chart.js';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-admin-view-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['admin-view.component.css'],
  templateUrl: 'admin-view.component.html'
})
export class AdminViewComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  @ViewChild('selectHours')
  hourSelector: MatSelect;

  @ViewChild('canvas')
  canvas: ElementRef;


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventsLoadingForMonth = true;

  reserving = false;

  reserveError = '';

  isValidSelection = false;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  changedData = 0;

  startDate: Date;
  peopleCount = 0;
  durationHours = 0;
  package;
  price;

  chart = [];
  chartIncome = [];

  eventsForCurrentMonth = [];
  eventForUser = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();


  events: MyCalenderEvent[] = [];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
              public adminService: AdminService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadAllUserEvents();
    this.loadAllEventForMonth(this.viewDate.getFullYear(), this.viewDate.getMonth());
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): { tempEvents, newEvent, length } {

    const tempEvents = [];
    const startDate = this.startDate;

    const newEvent = {
      title: this.peopleCount + ' people,   @ ' + this.startDate.getHours() + ':' + this.startDate.getMinutes() + '  , duration: ' +
        this.hourSelector.value + ' Hour',
      year: this.startDate.getFullYear(),
      month: this.startDate.getMonth(),
      start: this.startDate,
      end: new Date(startDate.getUTCFullYear(), startDate.getMonth(), startDate.getDate(),
        startDate.getHours() + Number(this.hourSelector.value), startDate.getMinutes()),
      duration: Number(this.hourSelector.value),
      // package: this.package,
      peopleCount: this.peopleCount,
      color: colors.blue,
      draggable: true,
      resizable: {
        beforeStart: false,
        afterEnd: true
      },
      completed: false,
      price: this.price,
      date: this.startDate.getDate(),
    } as MyCalenderEvent;
    tempEvents.push(newEvent);


    return {tempEvents: tempEvents.concat(this.events), newEvent: newEvent, length: tempEvents.length};
  }


  saveReservation() {

    const newEventDetails = this.addEvent();

    this.reserving = true;
    this.adminService.addReservationToUser(newEventDetails.newEvent).subscribe(next => {
        this.eventsLoadingForMonth = false;
        this.reserving = false;
        newEventDetails.tempEvents[newEventDetails.length - 1].docId = next;
        this.events = newEventDetails.tempEvents;
        console.log(this.events);
        this.refresh.next();

        this.openSnackBar('Reservation added', 'Okay');
      },
      error1 => {
        this.reserveError = 'Some error occurred!';
        this.reserving = false;
      });
  }

  loadAllUserEvents() {
    this.events = [];
    this.adminService.getAllUserReservations().subscribe(
      value => {
        if (value !== undefined) {
          for (const a of value) {
            const temp = {
              start: a.start.toDate(),
              end: a.end.toDate(),
              title: a.title,
              peopleCount: a.peopleCount,
              duration: a.duration,
              color: a.color,
              draggable: a.draggable,
              resizable: a.resizable,
              docId: a.docId,
              price: a.price
            };

            this.events.push(temp);
            this.refresh.next();
          }
        }
        this.refresh.next();
        this.eventsLoadingForMonth = false;
      },
      error1 => {
        this.eventsLoadingForMonth = false;
      },
      () => this.eventsLoadingForMonth = false
    );

  }

  cancelReservation(docId) {
    this.adminService.deleteUserReservation(docId).subscribe(
      next => {
        console.log('canceled');
        this.openSnackBar('Reservation canceled', 'Okay');
      },
      error1 => console.log('error occurred')
    );
  }


  loadAllEventForMonth(year, month) {
    this.adminService.getUserReservationForMonth(year, month).subscribe(next => {
      const a = next as MyCalenderEvent[];
      const temp = [];
      a.forEach(item => {
          item.start = item.start.toDate();
          item.end = item.end.toDate();
          temp.push(item);
        }
      );

      this.eventsForCurrentMonth = temp;
      this.initReservationChart(this.eventsForCurrentMonth);
      this.refresh.next();
    });
  }

  loadAllEventForDate(year, month, date) {
    this.adminService.getUserReservationForDate(year, month, date).subscribe(next => {
      const a = next as MyCalenderEvent[];
      const temp = [];
      a.forEach(item => {
          item.start = item.start.toDate();
          item.end = item.end.toDate();
          temp.push(item);
        }
      );

      this.eventsForCurrentMonth = temp;
      this.refresh.next();
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getPrice() {

    if (Number(this.peopleCount) * Number(this.durationHours) > 1) {
      this.price = Number(this.peopleCount) * Number(this.durationHours) * 100 -
        (Number(this.durationHours) * 10 + Number(this.peopleCount) * 10);
    }
    else {
      this.price = Number(this.peopleCount) * Number(this.durationHours) * 100;
    }

  }


  dataValidation() {
    this.changedData += 1;
    if (this.startDate && Date.now() < firebase.firestore.Timestamp.fromDate(this.startDate).toMillis() + 3600 * 1000) {
      this.isValidSelection = true;
      this.refresh.next();
      console.log('valid');
    }
    else {
      this.isValidSelection = false;
      this.refresh.next();
      console.log('invalid');
    }
  }

  initReservationChart(eventData: MyCalenderEvent[]) {
    const dates = Array.from({length: 31}, (v, k) => k + 1);
    const data = Array(31).fill(0);
    eventData.forEach(value => {
        const date = value.start.getDate();
        data[date] = data[date] + 1;
      }
    );


    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: data,
            borderColor: '#d66613',
            fill: true,
            backgroundColor: 'rgba(214,102,19,0.44)'
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Reservation counts per day'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    this.initIncomeChart(eventData, dates);
  }


  initIncomeChart(eventData: MyCalenderEvent[], datesArray?: number[]) {

    let dates;

    if (!dates) {
      dates = Array.from({length: 31}, (v, k) => k + 1);
    }
    else {
      dates = datesArray;
    }

    const data = Array(31).fill(0);
    eventData.forEach(value => {
        const date = value.start.getDate();
        const price = value.price;
        data[date] = data[date] + price;
      }
    );


    this.chart = new Chart('canvasIncome', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: data,
            borderColor: '#3cba9f',
            backgroundColor: 'rgba(60, 186, 159, 0.44)',
            fill: true
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Income Per day'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}





export class MyCalenderEvent implements CalendarEvent {
  uid?;
  docId?;
  start;
  title;
  end?;
  package?;
  price?;
  year?;
  month?;
  date?;
  peopleCount?;
  duration?;
  completed? = false;
  color?: any;
  draggable?: boolean;
  resizable?: { beforeStart: boolean; afterEnd: boolean; };
}
