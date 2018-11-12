import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {Observable, of, Subject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

class MockAuthService {
  user: Observable<any>;

  constructor() {
    this.createUser();
  }

  createUser() {
    let s: Subject<any> = new Subject();
    s.next({uid: 855});

    return this.user = s as Observable<any>;

  }

  nullUser() {
    this.user = of(null);
  }

}

fdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, {
        provide: AuthService,
        useClass: MockAuthService

      }]
    });

    let i = TestBed.get(AuthService);
    i.user = of(null);

  });

  afterEach(
    () => {
      let i = TestBed.get(AuthService);
      i.user = of(null);
    }
  );

  fit('should create service', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  fit('return true login on user object', inject([AuthGuard], (guard: AuthGuard) => {
    let i = TestBed.get(AuthService);
    i.createUser();
    guard.canActivate(null, null).subscribe(next => expect(next).toBeTruthy());
  }));

  fit('return false on null user object', inject([AuthGuard], (guard: AuthGuard) => {
    let i = TestBed.get(AuthService);
    i.nullUser();
    guard.canActivate(null, null).subscribe(next => expect(next).toBeFalsy());
  }));


});
