import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {AdminAuthGuard} from './admin-auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, AdminAuthGuard]
})
export class AuthModule { }
