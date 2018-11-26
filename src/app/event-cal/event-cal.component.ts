import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import {PoolReservationService} from '../services/pool-reservation.service';

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
  selector: 'app-cal-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['event-cal.component.css'],
  templateUrl: 'event-cal.component.html'
})
export class EventCalComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  @ViewChild('selectHours')
  hourSelector: MatSelect;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventsLoadingForMonth = true;

  reserving = false;

  reserveError = '';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  startDate: Date;
  peopleCount;
  durationHours;
  package;

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

  events: MyCalenderEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }

  ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
              public reservationService: PoolReservationService,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadEventForMonth();
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

  addEvent(): void {

    const startDate = this.startDate;
    this.events.push({
      title: this.peopleCount + ' people,   @ ' + this.startDate.getHours() + ':' + this.startDate.getMinutes() + '  , duration: ' +
        this.hourSelector.value + ' Hour',
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
      }
    });
    this.refresh.next();

  }


  saveReservation() {
    this.reserving = true;
    console.log(this.events);
    this.reservationService.addReservationToUser(this.startDate.getFullYear(), this.startDate.getMonth(), this.events).subscribe(next => {
        this.eventsLoadingForMonth = false;
        this.reserving = false;

        this.addEvent();

        this.openSnackBar('Reservation added', 'Okay');
      },
      error1 => {
        this.reserveError = 'Some error occurred!';
        this.reserving = false;
      });
  }

  loadEventForMonth() {
    this.events = [];
    this.reservationService.getUserReservations(this.viewDate.getFullYear(), this.viewDate.getMonth()).subscribe(
      value => {
        if (value !== undefined) {
          for (const a of value.reservationList) {
            const temp = {
              start: a.start.toDate(),
              end: a.end.toDate(),
              title: a.title,
              peopleCount: a.peopleCount,
              duration: a.duration,
              color: a.color,
              draggable: a.draggable,
              resizable: a.resizable
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

  cancelReservation(year, month, events) {

    this.reservationService.updateReservation(year, month, events).subscribe(
      next => {
        console.log('canceled');
        this.openSnackBar('Reservation canceled', 'Okay');
      },
      error1 => console.log('error ocurred')
    );
  }


  loadAllUserEvents() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



export class MyCalenderEvent implements CalendarEvent {
  start;
  title;
  end?;
  package?;
  peopleCount?;
  duration?;
  color?: any;
  draggable?: boolean;
  resizable?: { beforeStart: boolean; afterEnd: boolean; };
}
