import { TestBed } from '@angular/core/testing';

import { ResaVehicleService } from './resa-vehicle.service';

describe('ResaVehicleService', () => {
  let service: ResaVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResaVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
