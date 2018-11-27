import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {PoolReservationService} from "../services/pool-reservation.service";
import {Router} from '@angular/router';


@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactUsFormGroup: FormGroup;
  arr = [0, 1, 2]; // 0 = false, 1 = true, 2 = error
  success = this.arr[0];

  constructor(private formBuilder: FormBuilder,private service: PoolReservationService, private router: Router) {
    this.contactUsFormGroup = formBuilder.group( {
      contactName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      contactEmail: new FormControl('', [Validators.required, Validators.email] ),
      contactSubject: new FormControl('', Validators.minLength(1)),
      contactMessage: new FormControl('', Validators.minLength(10))
    } );
  }

  ngOnInit() {
  }

  submitContactUsData(data) {
    if(this.service.addContactUsForum(data)) {
      this.success = this.arr[1];
      this.contactUsFormGroup.reset();
    } else {
      this.success = this.arr[2]
    }
  }
}
