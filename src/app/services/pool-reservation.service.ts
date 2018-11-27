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

  /**
   * New reservation is added to both user and global reservation collections.
   * It will returns doc id on success adding
   * @param event reservation to save
   */
  addReservationToUser(event: MyCalenderEvent): Observable<DocumentReference> {

    let obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).add({
          reservationDetails: event,
          uid: user.uid,
          month: event.month,
          year: event.year
        } as ReservationData)).subscribe(next => {
          this.addReservationToGlobal(next.id, event).subscribe(val => obs.next(next.id));
        });
      }
    });

    return obs as Observable<any>;
  }

  addReservationToGlobal(userDocId, event) {
    let obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`reservation`).doc(userDocId).set({
          reservationDetails: event,
          uid: user.uid,
          month: event.month,
          year: event.year,
          docId: userDocId
        } as ReservationData)).subscribe(next => obs.next('added'));
      }
    });

    return obs as Observable<any>;
  }

  deleteUserReservation(userDocId) {
    const obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).doc(userDocId).delete()).subscribe(next => {
          from(this.firestore.collection(`reservation`).doc(userDocId).delete()).subscribe(value =>
            obs.next('deleted'));
        });
      }
    });

    return obs as Observable<any>;
  }






  getAllUserReservations() {
    const obs: Subject<any> = new Subject<any>();

    let reservations = [];

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`users/${user.uid}/reservation`).get()).subscribe(next => {
          next.docs.forEach(doc => {
            if (doc.data().reservationDetails) {

              const temp = doc.data().reservationDetails;
              temp.docId = doc.id;
              console.log(temp);
              reservations = reservations.concat(temp);
            }
          });

          obs.next(reservations);
        }, error1 => obs.error(error1));
      }
    });

    return obs as Observable<any>;
  }

  getUserReservationForMonth(year, month) {
    const obs: Subject<any> = new Subject<any>();
    const arr = [];
    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`reservation`).ref.where('reservationDetails.year', '==', year).where('reservationDetails.month', '==', month)
          .get()).subscribe(next => {
          next.docs.forEach(doc => {

            if (doc.data().reservationDetails) {
              const temp = doc.data().reservationDetails;
              temp.docId = doc.id;
              console.log(temp);
              arr.push(temp);
            }
          });

          obs.next(arr);

        }, error1 => obs.error(error1));
      }
    });

    return obs;
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
  reservationDetails
  uid
  month
  year
  docId?
}
