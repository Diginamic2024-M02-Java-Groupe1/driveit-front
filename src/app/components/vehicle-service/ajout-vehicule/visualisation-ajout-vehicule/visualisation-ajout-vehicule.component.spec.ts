import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationAjoutVehiculeComponent } from './visualisation-ajout-vehicule.component';

describe('VisualisationAjoutVehiculeComponent', () => {
  let component: VisualisationAjoutVehiculeComponent;
  let fixture: ComponentFixture<VisualisationAjoutVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualisationAjoutVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualisationAjoutVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
