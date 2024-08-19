import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVehicleServiceComponent } from './ajout-vehicle-service.component';

describe('AjoutVehicleServiceComponent', () => {
  let component: AjoutVehicleServiceComponent;
  let fixture: ComponentFixture<AjoutVehicleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutVehicleServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutVehicleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
