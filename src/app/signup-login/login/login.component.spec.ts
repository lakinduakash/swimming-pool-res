import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatProgressBarModule, AngularFireModule.initializeApp(environment.firebase, 'myApp'), BrowserAnimationsModule,
        MatProgressSpinnerModule]
      , providers: [AuthService, AngularFireAuth, AngularFirestore]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
