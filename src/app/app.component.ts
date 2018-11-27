import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from './signup-login/login/login.component';
import {AdminAuthGuard} from './core/auth/admin-auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aqua Technics';

  loginText = 'Login/Signup';
  userLogged = false;

  isAdmin = false;

  constructor(public authService: AuthService, public dialog: MatDialog, private adminGuard: AdminAuthGuard) {

  }

  ngOnInit() {

    this.authService.user.subscribe(
      user => {
        console.log(user);
        if (user != null) {
          this.loginText = 'Hi, ' + user.displayName;
          this.userLogged = true;
        } else {
          this.loginText = 'Login/Signup';
          this.userLogged = false;
        }
      }
    );

    this.adminGuard.canActivate(null, null).subscribe(next => this.isAdmin = next);

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
