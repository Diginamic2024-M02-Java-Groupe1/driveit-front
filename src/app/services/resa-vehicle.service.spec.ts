import { TestBed } from '@angular/core/testing';

import { BookingVehicleService } from './booking-vehicle.service';

describe('ResaVehicleService', () => {
  let service: BookingVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
