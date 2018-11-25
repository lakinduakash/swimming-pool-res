import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonWaterComponent} from './button-water.component';

describe('ButtonWaterComponent', () => {
  let component: ButtonWaterComponent;
  let fixture: ComponentFixture<ButtonWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonWaterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
