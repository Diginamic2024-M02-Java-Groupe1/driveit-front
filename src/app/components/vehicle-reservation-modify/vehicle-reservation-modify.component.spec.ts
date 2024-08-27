import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReservationModifyComponent } from './vehicle-reservation-modify.component';

describe('VehicleReservationModifyComponent', () => {
  let component: VehicleReservationModifyComponent;
  let fixture: ComponentFixture<VehicleReservationModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleReservationModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleReservationModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
