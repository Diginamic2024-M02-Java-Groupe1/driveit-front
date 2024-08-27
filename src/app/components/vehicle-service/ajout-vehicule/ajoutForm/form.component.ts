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
import {HttpErrorResponse} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule, VisualisationAjoutVehiculeComponent, InputMaskModule, NgForOf, NgIf, DropdownModule, InputTextModule, AutoCompleteModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  protected ajoutVehiculeForm!: FormGroup;
  submitted: boolean = false;
  selectedCategory: any;
  filteredCategories: any[] = [];


  categorieTab = [
    {value: 'SUV'},
    {value: 'Berline'},
    {value: 'Citadine'},
    {value: 'Utilitaire'},
    {value: 'Coupé'},
    {value: 'Cabriolet'},
    {value: 'Monospace'},
    {value: 'Break'},
    {value: '4x4'},
    {value: 'Pick-up'},
  ];

  brandTab = [
    {value: 'Audi'},
    {value: 'BMW'},
    {value: 'Citroën'},
    {value: 'Dacia'},
    {value: 'Fiat'},
    {value: 'Ford'},
    {value: 'Mercedes'},
    {value: 'Peugeot'},
    {value: 'Renault'},
    {value: 'Toyota'},
  ];

  motorizationTab = [
    // {value: 'Essence', label: 'EssenceMoteur'} //est appelé avec optionLabel pour afficher un label à la place de la value tout en gardant la value en base de données
    {value: 'Essence'},
    {value: 'Diesel'},
    {value: 'Hybride'},
    {value: 'Electrique'},
    {value: 'GPL'},
    {value: 'Hydrogène'},
  ];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleDataService,
  ) {
    this.ajoutVehiculeForm = new FormGroup({
      registration: new FormControl('', [Validators.required]),
      numberOfSeats: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', [Validators.required]), // Initialize with a number
      brand: new FormControl('', [Validators.required]), // Initialize with a number
      model: new FormControl('', [Validators.required]),
      motorization: new FormControl('', [Validators.required]), // Initialize with a number
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
        motorization: this.ajoutVehiculeForm.get('motorization')?.value,
        brand: this.ajoutVehiculeForm.get('brand')?.value,
        category: this.ajoutVehiculeForm.get('category')?.value,
        model: this.ajoutVehiculeForm.get('model')?.value,
      };

      const promise = this.vehicleService.insertVehicle(vehicle).toPromise();
      // this.ajoutVehiculeForm.reset(); //todo reset form after a successful submit

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => `${data}`,
        error: (error)=> {
          console.error(error);
          return "error";
        }
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
    this.ajoutVehiculeForm.valueChanges.subscribe();
    // this.vehicleService.getCategories().then((categories) => { //TODO créer une méthode get pour requêter en base de données les catégories
    //   this.categorieTab = categories
    // })
    this.categorieTab;
  }

  onUrlInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.ajoutVehiculeForm.get('urlImage')?.setValue(input.value);
  }

  addNewCategory(newCategoryLabel: string) {
    if (newCategoryLabel.trim().length > 0) {
      const newCategoryValue = newCategoryLabel.toLowerCase().replace(/\s+/g, '-');

      // Vérifier si la catégorie existe déjà
      if (!this.categorieTab.some(category => category.value === newCategoryValue)) {
        // Ajouter la nouvelle catégorie
        this.categorieTab.push({ value: newCategoryValue });
        this.selectedCategory = newCategoryValue; // Mise à jour de la sélection
      }
    }
  }

  filterCategory($event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = $event.query;

      for (let i=0; i<(this.categorieTab as any).length; i++) {
          let category = this.categorieTab[i];
          if (category.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(category);
          }
      }
      this.filteredCategories = filtered;
  }
}
