import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[AuthService,AuthGuard]
})
export class AuthModule { }
