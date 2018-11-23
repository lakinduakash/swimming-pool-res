import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCalComponent} from './event-cal.component';

describe('EventCalComponent', () => {
  let component: EventCalComponent;
  let fixture: ComponentFixture<EventCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventCalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
