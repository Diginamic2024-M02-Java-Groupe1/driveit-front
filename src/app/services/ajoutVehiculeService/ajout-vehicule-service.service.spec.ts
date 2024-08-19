import { TestBed } from '@angular/core/testing';

import { AjoutVehiculeServiceService } from './ajout-vehicule-service.service';

describe('AjoutVehiculeServiceService', () => {
  let service: AjoutVehiculeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutVehiculeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
