import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBookingHistoryComponent } from './vehicle-booking-history.component';

describe('VehicleReservationHistoryComponent', () => {
  let component: VehicleBookingHistoryComponent;
  let fixture: ComponentFixture<VehicleBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleBookingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
