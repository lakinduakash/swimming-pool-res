import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from './signup-login/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'swimming-pool-res';

  constructor(public authService: AuthService, public dialog: MatDialog) {

  }

  openLoginDialog() {

    let dialogRef;
    if (this.dialog.openDialogs.length === 0) {
      dialogRef = this.dialog.open(LoginComponent, {minWidth: '330px'});
    }
  }
}
