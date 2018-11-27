import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public map: any = { lat: 51.678418, lng: 7.809007 };

  constructor(private router: Router) {}

  ngOnInit() {

  }

  redirectUser(){
    this.router.navigate(['login']);
  }

}
