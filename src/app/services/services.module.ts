import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PoolReservationService} from './pool-reservation.service';
import {AdminService} from './admin.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PoolReservationService, AdminService]
})
export class ServicesModule {
}
