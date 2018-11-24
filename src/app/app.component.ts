import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from './signup-login/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'swimming-pool-res';

  loginText = 'Login/Signup';

  constructor(public authService: AuthService, public dialog: MatDialog) {

  }

  ngOnInit() {

    this.authService.user.subscribe(
      user => {
        console.log(user);
        if (user != null) {
          this.loginText = 'Hi, ' + user.displayName;
        } else {
          this.loginText = 'Login/Signup';
        }
      }
    );

  }

  login() {

    let dialogRef;
    const sub = this.authService.user.subscribe(
      user => {
        if (user == null) {

          if (this.dialog.openDialogs.length === 0) {
            dialogRef = this.dialog.open(LoginComponent, {minWidth: '330px'});
          }
        } else {
          dialogRef.close();
          sub.unsubscribe();
        }
      }
    );

  }
}
