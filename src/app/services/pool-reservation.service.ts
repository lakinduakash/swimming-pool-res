import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {AuthService} from '../core/auth/auth.service';
import {from, Observable, Subject} from 'rxjs';
import {MyCalenderEvent} from '../admin-view/admin-view.component';

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

    const obs: Subject<any> = new Subject<any>();

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
    const obs: Subject<any> = new Subject<any>();

    this.authService.user.subscribe(user => {
      if (user != null) {
        from(this.firestore.collection(`reservation`).doc(userDocId).set({
          reservationDetails: event,
          uid: user.uid,
          month: event.month,
          year: event.year,
          date: event.start.getDate(),
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

  /**
   * This will return all reservation of particular user and it will assign docId on return
   */

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

  /**
   * return reservations for particular year and month
   * @param year year to filter
   * @param month month to filter
   */
  getUserReservationForMonth(year: number, month: number) {
    const obs: Subject<any> = new Subject<any>();
    this.authService.user.subscribe(user => {
      if (user != null) {
        this.firestore.collection(`reservation`).ref.where('year', '==', year).where('month', '==', month)
          .onSnapshot(next => {
            const arr = [];
          next.docs.forEach(doc => {

            if (doc.data().reservationDetails) {
              const temp = doc.data().reservationDetails;
              temp.docId = doc.id;
              console.log(temp);
              arr.push(temp);
            }
          });
            console.log(arr);
          obs.next(arr);

        }, error1 => obs.error(error1));
      }
    });

    return obs as Observable<any>;
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

export interface ReservationData {
  reservationDetails
  uid?
  month?
  year?
  date?
  docId?
}
