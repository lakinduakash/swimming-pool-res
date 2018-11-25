import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonWaterComponent} from './button-water/button-water.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [ButtonWaterComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonWaterComponent, FooterComponent]
})
export class SharedModule {
}
