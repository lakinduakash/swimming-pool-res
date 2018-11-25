import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PoolReservationService {

  constructor(public firestore: AngularFirestore) {
  }

  // example for save event to firestore. This method can called from any component
  addEvent(event) {
    this.firestore.collection(`events/${event.month}`).add(event);
  }
  method to store contact us details in the firestore
  addContactUsForum(event){
    return this.firestore.collection('contactus/').add({
      contactEmail: event.value.contactEmail,
      contactMessage: event.value.contactMessage,
      contactName: event.value.contactName,
      contactSubject: event.value.contactSubject
    });
  }
}
