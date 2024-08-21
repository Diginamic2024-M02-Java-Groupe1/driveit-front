import {Component, input, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {
  VisualisationAjoutVehiculeComponent
} from "@components/ajout-vehicle-service/visualisation-ajout-vehicule/visualisation-ajout-vehicule.component";
import { InputMaskModule } from 'primeng/inputmask';
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";
import {Vehicle} from "@models/vehicle";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule, VisualisationAjoutVehiculeComponent, InputMaskModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  protected ajoutVehiculeForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService : VehicleDataService
  ) {
    this.ajoutVehiculeForm = new FormGroup({
      immatriculation: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{2}-\\d{3}-[A-Z]{2}')],),
      nbPlaces: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      motorisation: new FormControl('', [Validators.required]),
      emission: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', [Validators.required]),
      urlImage: new FormControl('', [Validators.required]),
      isService: new FormControl('', [Validators.required]),
    });
  }

  get immatriculation() {
    return this.ajoutVehiculeForm.get('immatriculation');
  }

  get nbPlaces() {
    return this.ajoutVehiculeForm.get('nbPlaces');
  }

  get category() {
    return this.ajoutVehiculeForm.get('category');
  }

  get brand() {
    return this.ajoutVehiculeForm.get('brand');
  }

  get model() {
    return this.ajoutVehiculeForm.get('model');
  }

  get motorisation() {
    return this.ajoutVehiculeForm.get('motorisation');
  }

  get emission() {
    return this.ajoutVehiculeForm.get('emission');
  }

  get status() {
    return this.ajoutVehiculeForm.get('status');
  }

  get urlImage() {
    return this.ajoutVehiculeForm.get('urlImage');
  }

  get isService() {
    return this.ajoutVehiculeForm.get('isService');
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.ajoutVehiculeForm.value);
    if (this.ajoutVehiculeForm.valid) {
      const vehicle: Vehicle = this.ajoutVehiculeForm.value;
      this.vehicleService.insertVehicle(vehicle).subscribe();
      console.log('Le véhicule a été ajouté avec succès.');
    } else {
      console.log('Le formulaire est invalide.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.ajoutVehiculeForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control?.hasError('pattern')) {
      return "Le format de la plaque d'immatriculation est invalide";
    }
    if (control?.hasError('min')) {
      return `La valeur saisie doit être supérieure à ${control.errors?.['min'].min}.`;
    }
    return '';

  }

  ngOnInit(): void {
    this.ajoutVehiculeForm.valueChanges.subscribe(value => {
      console.log('Form changes', value);
    });
  }

  onUrlInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.ajoutVehiculeForm.get('urlImage')?.setValue(input.value);
  }

}
