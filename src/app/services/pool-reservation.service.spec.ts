import {TestBed} from '@angular/core/testing';

import {PoolReservationService} from './pool-reservation.service';

describe('PoolReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoolReservationService = TestBed.get(PoolReservationService);
    expect(service).toBeTruthy();
  });
});
