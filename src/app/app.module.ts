import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './core/auth/auth.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouteModule} from './route.module';
import {UserSignInUpModule} from './signup-login/user-signin-up.module';
import {ButtonsModule, CarouselModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';
import {HomeComponent} from './home/home.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ContactComponent} from './contact-component/contact.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {EventCalComponent} from './event-cal/event-cal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FlatpickrModule} from 'angularx-flatpickr';
import {ServicesModule} from './services/services.module';
import {LoginComponent} from './signup-login/login/login.component';
import {DlDateTimePickerDateModule} from 'angular-bootstrap-datetimepicker';
import {SharedModule} from './shared/shared.module';
import {AdminViewComponent} from './admin-view/admin-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    ContactComponent,
    EventCalComponent,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    UserSignInUpModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule,
    WavesModule,
    ButtonsModule,
    MatButtonModule,
    MatInputModule,
    NavbarModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ServicesModule,
    MatDialogModule,
    ReactiveFormsModule,
    DlDateTimePickerDateModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
