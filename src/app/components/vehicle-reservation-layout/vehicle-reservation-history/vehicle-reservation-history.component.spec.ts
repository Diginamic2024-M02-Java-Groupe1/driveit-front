import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReservationHistoryComponent } from './vehicle-reservation-history.component';

describe('VehicleReservationHistoryComponent', () => {
  let component: VehicleReservationHistoryComponent;
  let fixture: ComponentFixture<VehicleReservationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleReservationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleReservationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
