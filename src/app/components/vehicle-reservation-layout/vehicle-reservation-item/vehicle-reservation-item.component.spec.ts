import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReservationItemComponent } from './vehicle-reservation-item.component';

describe('VehicleReservationItemComponent', () => {
  let component: VehicleReservationItemComponent;
  let fixture: ComponentFixture<VehicleReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleReservationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
