import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WaterDropEffectComponent} from './water-drop-effect.component';

describe('WaterDropEffectComponent', () => {
  let component: WaterDropEffectComponent;
  let fixture: ComponentFixture<WaterDropEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaterDropEffectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterDropEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
