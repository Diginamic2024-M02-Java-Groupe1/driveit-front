import {Component, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { VehicleDataService } from '@services/ajoutVehiculeService/vehicle-data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  validators: Validators = [
    Validators.required,
    Validators.minLength(1),
    Validators.nullValidator
  ]

  constructor(
    private fb: FormBuilder,
    public vehicleDataService: VehicleDataService
  ) {
  }

  form: FormGroup = new FormGroup({
    immatriculation: new FormControl('', this.validators),
    nbPlaces: new FormControl('', this.validators),
    category: new FormControl('', this.validators),
    brand: new FormControl('', this.validators),
    model: new FormControl('', this.validators),
    status: new FormControl('', this.validators), //TODO mettre AVAILABLE par défaut
  });

  onSubmit(): void {

  }

  ngOnInit(): void {
  }


}
