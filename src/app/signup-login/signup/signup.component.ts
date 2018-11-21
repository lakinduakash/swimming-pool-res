import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {User} from '../../shared/model/user';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  showSpinner = false;

  signupStates = ['ALREADY_R', 'ERROR', 'VERIFICATION_SEND', 'SIGNUP'];

  state = this.signupStates[3];
  isHandest$;


  constructor(private fb: FormBuilder, private auth: AuthService, private breakPointObserver: BreakpointObserver) {

    this.signupFormGroup = fb.group({
        fName: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(1)])],
        lName: ['', [Validators.required, Validators.maxLength(19)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordc: ['', Validators.required]
      },
      {
        validator: PasswordValidation.MatchPassword
      });

  }

  ngOnInit() {

    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).subscribe(next => this.isHandest$ = next.matches);

  }

  updateUserData(user, data) {
    const u: User = {
      uid: user.uid,
      email: user.email,
      displayName: data.value.fName + ' ' + data.value.lName


    };

    this.auth.sendVerificationEmail().subscribe(
      next => {
        console.log(user);
        console.log(u);
        this.auth.updateUserData(user, u).subscribe(next => {
            this.showSpinner = false;
            console.log('succsess');
            this.state = this.signupStates[2];
          },
          error1 => {
            console.log(error1);
            this.showSpinner = false;
          });
      }
    );

  }

  postData(data) {
    this.showSpinner = true;
    this.auth.emailSignUp(data.value.email, data.value.password).subscribe(next => {
        console.log(next);
        this.updateUserData(next.user, data);
      }, error1 => {
        console.log(error1);
        this.showSpinner = false;
        if (error1.code == 'auth/email-already-in-use')
          this.state = this.signupStates[0];
        else
          this.state = this.signupStates[1];
      }
    );

  }

}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('passwordc').value; // to get value in input tag
    if (password != confirmPassword || password.length < 8) {

      AC.get('passwordc').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}
