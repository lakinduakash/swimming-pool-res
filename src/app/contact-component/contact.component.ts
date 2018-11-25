import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {PoolReservationService} from "../services/pool-reservation.service";


@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactUsFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder,private service: PoolReservationService) {
    this.contactUsFormGroup = formBuilder.group( {
      contactName: ['', [Validators.required, Validators.minLength(1)] ],
      contactEmail: ['', [Validators.required, Validators.email] ],
      contactSubject: ['', Validators.minLength(1)],
      contactMessage: ['', Validators.minLength(10)]
    } );
  }

  ngOnInit() {
  }

  submitContactUsData(data) {
    if(this.service.addContactUsForum(data)) {
      console.log ('ado anna weda');
    } else {
      console.log ('kela una');
    }
  }
}
