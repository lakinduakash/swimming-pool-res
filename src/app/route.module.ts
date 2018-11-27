import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './signup-login/login/login.component';
import {SignupComponent} from './signup-login/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact-component/contact.component';
import {EventCalComponent} from './event-cal/event-cal.component';
import {AuthGuard} from './core/auth/auth.guard';
import {AdminViewComponent} from './admin-view/admin-view.component';
import {AdminAuthGuard} from './core/auth/admin-auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'reserve', component: EventCalComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: '**', component: HomeComponent},
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRouteModule { }
