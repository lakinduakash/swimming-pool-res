import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonWaterComponent} from './button-water/button-water.component';

@NgModule({
  declarations: [ButtonWaterComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonWaterComponent]
})
export class SharedModule {
}
