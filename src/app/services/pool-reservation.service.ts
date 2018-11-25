import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {AuthService} from '../core/auth/auth.service';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoolReservationService {

  constructor(public firestore: AngularFirestore, public authService: AuthService) {
  }

  // example for save event to firestore. This method can called from any component
  addReservationToUser(year, month, event): Observable<DocumentReference> {

    let obs: Observable<DocumentReference>;
    this.authService.user.subscribe(user => {
      if (user != null) {
        obs = from(this.firestore.collection(`user/${user.uid}/reservation/${year}/${month}`).add(event));
      } else {
        obs = of(null);
      }
    });
    return obs;
  }
  // method to store contact us details in the firestore
  addContactUsForum(event){
    return this.firestore.collection('contactus/').add({
      contactEmail: event.value.contactEmail,
      contactMessage: event.value.contactMessage,
      contactName: event.value.contactName,
      contactSubject: event.value.contactSubject
    });
  }
}
