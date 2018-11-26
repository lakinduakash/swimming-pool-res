import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {AuthService} from '../core/auth/auth.service';
import {from, Observable, Subject} from 'rxjs';
import {MyCalenderEvent} from '../event-cal/event-cal.component';

@Injectable({
  providedIn: 'root'
})
export class PoolReservationService {

  constructor(public firestore: AngularFirestore, public authService: AuthService) {
  }

  // example for save event to firestore. This method can called from any component
  addReservationToUser(year, month, events: MyCalenderEvent[]): Observable<DocumentReference> {

    let obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).doc(`${'' + year + '' + month}`).set({reservationList: events} as ReservationData)).subscribe(next => obs.next(true));
      }
    });

    return obs as Observable<any>;
  }

  getUserReservations(year, month) {

    let obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).doc(`${'' + year + '' + month}`).get()).subscribe(next => {
            obs.next(next.data());
        }, error1 => obs.error(error1))
      }
    });

    return obs as Observable<any>;
  }

  updateReservation(year, month, events) {
    let obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).doc(`${'' + year + '' + month}`).update({reservationList: events} as ReservationData)).subscribe(next => obs.next(true));
      }
    });

    return obs as Observable<any>;

  }

  getAllReservations(year, month) {

  }




  // method to store contact us details in the firestore
  addContactUsForum(event) {
    return this.firestore.collection('contactus/').add({
      contactEmail: event.value.contactEmail,
      contactMessage: event.value.contactMessage,
      contactName: event.value.contactName,
      contactSubject: event.value.contactSubject
    });
  }

  // method to retrieve contact us details from database
  getContactUsDetails(){

  }
}

interface ReservationData {
  reservationList

}
