import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonWaterComponent} from './button-water/button-water.component';
import {FooterComponent} from './footer/footer.component';
import {WaterDropEffectComponent} from './water-drop-effect/water-drop-effect.component';

@NgModule({
  declarations: [ButtonWaterComponent, FooterComponent, WaterDropEffectComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonWaterComponent, FooterComponent]
})
export class SharedModule {
}
