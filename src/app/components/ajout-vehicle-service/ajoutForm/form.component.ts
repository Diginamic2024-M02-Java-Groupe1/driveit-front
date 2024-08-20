import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleDataService } from '@services/ajoutVehiculeService/vehicle-data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public vehicleDataService: VehicleDataService
  ) {
    this.form = this.fb.group({
      immatriculation: [''],
      nbPlaces: [''],
      category: [''],
      pollution: [''],
      brand: [''],
      model: [''],
      motorization: [''],
      status: ['']
    });
  }

  onSubmit(): void {
    this.vehicleDataService.immatriculation = this.form.value.immatriculation;
    this.vehicleDataService.nbPlaces = this.form.value.nbPlaces;
    this.vehicleDataService.category = this.form.value.category;
    this.vehicleDataService.pollution = this.form.value.pollution;
    this.vehicleDataService.brand = this.form.value.brand;
    this.vehicleDataService.model = this.form.value.model;
    this.vehicleDataService.motorization = this.form.value.motorization;
    this.vehicleDataService.status = this.form.value.status;
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.vehicleDataService.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
