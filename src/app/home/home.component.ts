import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {LoginComponent} from '../signup-login/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Aqua Technics";

  buttonText = 'Login To Reserve';

  constructor(private router: Router, private auth: AuthService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user != null) {
        this.buttonText = 'Reserve';
      }
      else {
        this.buttonText = 'Login To Reserve';
      }
    });
  }


  reserve() {

    let dialogRef;
    const sub = this.auth.user.subscribe(
      user => {
        if (user == null) {

          if (this.dialog.openDialogs.length === 0) {
            dialogRef = this.dialog.open(LoginComponent, {minWidth: '330px'});
          }
        } else {
          if (dialogRef)
            dialogRef.close();
          sub.unsubscribe();
          this.router.navigate(['reserve']);

        }
      }
    );

  }


}
