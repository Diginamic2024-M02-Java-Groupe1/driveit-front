import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaVehicleComponent } from './resa-vehicle.component';

describe('ResaVehicleComponent', () => {
  let component: ResaVehicleComponent;
  let fixture: ComponentFixture<ResaVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResaVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResaVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
