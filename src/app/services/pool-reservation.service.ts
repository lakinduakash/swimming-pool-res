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
}
