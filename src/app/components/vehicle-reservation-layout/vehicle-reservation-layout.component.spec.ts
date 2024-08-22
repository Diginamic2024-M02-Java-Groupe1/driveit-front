import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReservationLayoutComponent } from './vehicle-reservation-layout.component';

describe('VehicleReservationLayoutComponent', () => {
  let component: VehicleReservationLayoutComponent;
  let fixture: ComponentFixture<VehicleReservationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleReservationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleReservationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
