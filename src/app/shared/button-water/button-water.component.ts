import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-water',
  templateUrl: './button-water.component.html',
  styleUrls: ['./button-water.component.scss']
})
export class ButtonWaterComponent implements OnInit {

  @Input('text')
  buttonText: string;

  @Input('width')
  width = '50px';
  @Output('clickButton')
  click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  clickButton() {
    this.click.emit();
  }

}
