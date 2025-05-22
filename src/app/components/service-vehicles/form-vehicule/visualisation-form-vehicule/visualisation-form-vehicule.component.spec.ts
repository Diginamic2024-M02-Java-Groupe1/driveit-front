import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationFormVehiculeComponent } from './visualisation-form-vehicule.component';

describe('VisualisationFormVehiculeComponent', () => {
  let component: VisualisationFormVehiculeComponent;
  let fixture: ComponentFixture<VisualisationFormVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualisationFormVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualisationFormVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
