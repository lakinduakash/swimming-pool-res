import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Aqua Technics";

  constructor(private router: Router) {}

  ngOnInit() {

  }

  redirectUser(){
    this.router.navigate(['login']);
  }

}
