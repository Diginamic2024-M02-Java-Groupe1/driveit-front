import { TestBed } from '@angular/core/testing';

import { VehicleReservationHistoryService } from './vehicle-reservation-history.service';

describe('VehicleReservationHistoryService', () => {
  let service: VehicleReservationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleReservationHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
