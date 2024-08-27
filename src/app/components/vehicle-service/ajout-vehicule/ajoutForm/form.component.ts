import {Component, input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {
  VisualisationAjoutVehiculeComponent
} from "@components/vehicle-service/ajout-vehicule/visualisation-ajout-vehicule/visualisation-ajout-vehicule.component";
import {InputMaskModule} from 'primeng/inputmask';
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";
import {Vehicle} from "@models/vehicle";
import {StatusVehicle} from "@models/enums/status-vehicle.enum";
import {toast} from "ngx-sonner";
import {DropdownModule} from "primeng/dropdown";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule, VisualisationAjoutVehiculeComponent, InputMaskModule, NgForOf, NgIf, DropdownModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  protected readonly toast = toast;
  protected readonly StatusVehicle = StatusVehicle;
  protected ajoutVehiculeForm!: FormGroup;
  submitted: boolean = false;


  categorieTab = [
    {value: '1', text: 'SUV'},
    {value: '2', text: 'Berline'},
    {value: '3', text: 'Citadine'},
    {value: '4', text: 'Utilitaire'},
    {value: '5', text: 'Coupé'},
    {value: '6', text: 'Cabriolet'},
    {value: '7', text: 'Monospace'},
    {value: '8', text: 'Break'},
    {value: '9', text: '4x4'},
    {value: '10', text: 'Pick-up'},
  ];

  brandTab = [
    {value: '1', text: 'Audi'},
    {value: '2', text: 'BMW'},
    {value: '3', text: 'Citroën'},
    {value: '4', text: 'Dacia'},
    {value: '5', text: 'Fiat'},
    {value: '6', text: 'Ford'},
    {value: '7', text: 'Mercedes'},
    {value: '8', text: 'Peugeot'},
    {value: '9', text: 'Renault'},
    {value: '10', text: 'Toyota'},
  ];

  motorizationTab = [
    {value: '1', text: 'Essence'},
    {value: '2', text: 'Diesel'},
    {value: '3', text: 'Hybride'},
    {value: '4', text: 'Electrique'},
    {value: '5', text: 'GPL'},
    {value: '6', text: 'Hydrogène'},
  ];


  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleDataService
  ) {
    this.ajoutVehiculeForm = new FormGroup({
      registration: new FormControl('', [Validators.required]),
      numberOfSeats: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl(0, [Validators.required]), // Initialize with a number
      brand: new FormControl(0, [Validators.required]), // Initialize with a number
      model: new FormControl('', [Validators.required]),
      motorization: new FormControl(0, [Validators.required]), // Initialize with a number
      emission: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl(StatusVehicle.AVAILABLE, [Validators.required]),
      url: new FormControl('', [Validators.required]),
      service: new FormControl(true, [Validators.required]),
    });

  }

  get registration() {
    return this.ajoutVehiculeForm.get('registration');
  }

  get numberOfSeats() {
    return this.ajoutVehiculeForm.get('numberOfSeats');
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

  get motorization() {
    return this.ajoutVehiculeForm.get('motorization');
  }

  get emission() {
    return this.ajoutVehiculeForm.get('emission');
  }

  get status() {
    return this.ajoutVehiculeForm.get('status');
  }

  get url() {
    return this.ajoutVehiculeForm.get('url');
  }

  get service() {
    return this.ajoutVehiculeForm.get('service');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.ajoutVehiculeForm.valid) {  // Vérifiez si le formulaire est valide
      const vehicle: Vehicle = {
        registration: this.ajoutVehiculeForm.get('registration')?.value,
        numberOfSeats: this.ajoutVehiculeForm.get('numberOfSeats')?.value,
        service: this.ajoutVehiculeForm.get('service')?.value,
        emission: this.ajoutVehiculeForm.get('emission')?.value,
        url: this.ajoutVehiculeForm.get('url')?.value,
        motorizationId: Number(this.ajoutVehiculeForm.get('motorization')?.value), // Ensure it's an integer
        brandId: Number(this.ajoutVehiculeForm.get('brand')?.value), // Ensure it's an integer
        categoryId: Number(this.ajoutVehiculeForm.get('category')?.value), // Ensure it's an integer
        model: this.ajoutVehiculeForm.get('model')?.value,
      };

      const promise = this.vehicleService.insertVehicle(vehicle).toPromise();
      // this.ajoutVehiculeForm.reset(); //todo reset form after a successful submit

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => `${data}`,
        error: 'Error',
      });

    } else {
      console.log('Le formulaire est invalide.');
      toast.warning('Veuillez compléter le formulaire.');
    }

    console.log(this.ajoutVehiculeForm.value);
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
