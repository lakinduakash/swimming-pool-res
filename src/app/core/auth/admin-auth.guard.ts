import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private fire: AngularFirestore) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const s: Subject<boolean> = new Subject();

    this.auth.user.subscribe(
      user => {
        if (user != null) {
          this.fire.collection('users').doc(user.uid).get().subscribe(doc => {
            if (doc.data().admin) {
              s.next(true);
            } else {
              s.next(false);
              this.router.navigate(['/home']);
            }
          });
        } else {
          s.next(false);
          this.router.navigate(['/home']);
        }
      }
    );

    return s as Observable<boolean>;
  }
}
