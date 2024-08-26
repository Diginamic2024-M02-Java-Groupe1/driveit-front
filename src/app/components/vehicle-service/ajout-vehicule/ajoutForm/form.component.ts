import {Component, input, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {
  VisualisationAjoutVehiculeComponent
} from "@components/vehicle-service/ajout-vehicule/visualisation-ajout-vehicule/visualisation-ajout-vehicule.component";
import {InputMaskModule} from 'primeng/inputmask';
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";
import {Vehicle} from "@models/vehicle";
import {StatusVehicle} from "@models/enums/status-vehicle.enum";



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule, VisualisationAjoutVehiculeComponent, InputMaskModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // vehicleNew: Vehicle= {} as Vehicle;
  protected ajoutVehiculeForm!: FormGroup;
  submitted: boolean = false;
  vehicles: Vehicle[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleDataService
  ) {
    // Validators.pattern('[A-Z]{2}-\\d{3}-[A-Z]{2}')]
    this.ajoutVehiculeForm = new FormGroup({
      registration: new FormControl('', [Validators.required]),
      numberOfSeats: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      motorization: new FormControl('', [Validators.required]),
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
        motorizationId: this.ajoutVehiculeForm.get('motorization')?.value,
        brandId: this.ajoutVehiculeForm.get('brand')?.value,
        categoryId: this.ajoutVehiculeForm.get('category')?.value,
        model: this.ajoutVehiculeForm.get('model')?.value,
      };

      this.vehicleService.insertVehicle(vehicle).subscribe((data: string) => {
        if (data.length) {
          console.log(data);
          alert(data);
        } else {
          console.error(data);
          alert(data);
        }
      });
    } else {
      console.log('Le formulaire est invalide.');
      alert('Veuillez corriger les erreurs dans le formulaire.');
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

  protected readonly StatusVehicle = StatusVehicle;
}
