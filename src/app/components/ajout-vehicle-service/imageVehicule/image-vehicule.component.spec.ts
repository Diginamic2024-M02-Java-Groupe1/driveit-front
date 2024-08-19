import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVehiculeComponent } from './image-vehicule.component';

describe('ImageVehiculeComponent', () => {
  let component: ImageVehiculeComponent;
  let fixture: ComponentFixture<ImageVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
