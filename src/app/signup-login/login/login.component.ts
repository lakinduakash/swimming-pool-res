import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AngularFireAuth} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal-compatibility';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(170)
      ]),

    ])
  ]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showSpinner = false;

  logginStatus;

  emailVerifiedStatus = '';

  isHandest$;
  inFogotFassword = false;
  successResetSend;

  emailSentMassage = '';
  errorMassage = '';

  constructor(private authService: AuthService, private router: Router, private breakPointObserver: BreakpointObserver, private authf: AngularFireAuth) {

    this.authf.user.subscribe(next => {
      if (next != undefined && next.emailVerified)
        this.router.navigate(['']);
      else {
        //this.emailVerifiedStatus="Email not verified, first verify the email";
        this.authf.auth.signOut();
      }

    });

  }

  ngOnInit() {

    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).subscribe(next => this.isHandest$ = next.matches);
  }

  login() {
    this.showSpinner = true;
    this.authService.emailLogin(this.email, this.password).subscribe(next => {

      this.authf.user.subscribe(next => {
        if (next != undefined && next.emailVerified)
          this.router.navigate(['']);
        else {
          this.emailVerifiedStatus = 'Email not verified, first verify the email';
          this.authf.auth.signOut();
        }

      });

      this.showSpinner = false;
    }, error1 => {
      console.log(error1);
      this.errorMassage = 'User name or email not correct';
      this.showSpinner = false;
    });
  }

  checkVerificationStus() {

  }

  forgotPasswordClick() {
    this.inFogotFassword = true;
  }

  back() {
    this.inFogotFassword = false;
    this.successResetSend = false;
    this.emailSentMassage = '';
  }

  sendRecoveryMail() {
    this.showSpinner = true;
    fromPromise(this.authf.auth.sendPasswordResetEmail(this.email)).subscribe(next => {
      this.successResetSend = true;
      this.showSpinner = false;
      this.emailSentMassage = 'Email sent, check your inbox';
    }, error1 => {
      this.successResetSend = false;
      this.showSpinner = false;
      this.emailSentMassage = 'Error occurred, check your email';
    });
  }


}
