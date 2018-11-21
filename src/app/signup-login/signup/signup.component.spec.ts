import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../core/auth/auth.service';
import {environment} from '../../../environments/environment';

fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [RouterTestingModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatProgressBarModule, AngularFireModule.initializeApp(environment.firebaseConfig, 'myApp'), BrowserAnimationsModule]
      , providers: [AuthService, AngularFireAuth, AngularFirestore]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
