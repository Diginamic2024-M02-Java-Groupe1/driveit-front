import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {StatusVehicle} from "@models/enums/status-vehicle.enum";
import {toast} from "ngx-sonner";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {VehicleService} from "@services/vehicle/vehicle.service";
import {Vehicle} from "@models/vehicle.model";
import {HttpErrorResponse} from "@angular/common/http";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    VisualisationFormVehiculeComponent
} from "@components/service-vehicles/form-vehicule/visualisation-form-vehicule/visualisation-form-vehicule.component";
import {Button} from "primeng/button";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth.service";
import {isAdmin} from "@utils/isAdmin.util";

@Component({
    selector: 'app-form-vehicule',
    standalone: true,
    imports: [NgClass, ReactiveFormsModule, FormsModule, InputMaskModule, NgIf, DropdownModule, InputTextModule, AutoCompleteModule, VisualisationFormVehiculeComponent, Button, NgSwitch, NgSwitchCase, NgForOf, NgSwitchDefault],
    templateUrl: './form-vehicule.component.html',
    styleUrls: ['./form-vehicule.component.scss'],
})

export class FormVehiculeComponent implements OnInit {
    protected ajoutVehiculeForm!: FormGroup;
    submitted: boolean = false;
    filteredCategories: any[] = [];
    filteredMotorizations: any[] = [];
    filteredBrands: any[] = [];
    filteredStatuses: any[] = [];
    isInDialogModal: boolean = false;
    vehicleToUpdate: Vehicle | undefined;
    protected authService = inject(AuthService);

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
        {value: 'Essence'},
        {value: 'Diesel'},
        {value: 'Hybride'},
        {value: 'Electrique'},
        {value: 'GPL'},
        {value: 'Hydrogène'},
    ];

    statusTab = Object.values(StatusVehicle).map((status) => ({
        value: status
    }));

    constructor(
        private vehicleService: VehicleService,
        public config: DynamicDialogConfig,
        public router: Router
    ) {
        this.ajoutVehiculeForm = new FormGroup({
            registration: new FormControl('', [Validators.required]),
            numberOfSeats: new FormControl('', [Validators.required, Validators.min(1)]),
            category: new FormControl('', [Validators.required]),
            brand: new FormControl('', [Validators.required]),
            model: new FormControl('', [Validators.required]),
            motorization: new FormControl('', [Validators.required]),
            emission: new FormControl('', [Validators.required, Validators.min(0)]),
            status: new FormControl(StatusVehicle.AVAILABLE, [Validators.required]),
            url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
            service: new FormControl(isAdmin(this.authService.getUserRole()) ? true : '', isAdmin(this.authService.getUserRole()) ? [Validators.required] : []),
        });

        if (this.config?.data?.isInDialogModal !== undefined) {
            this.isInDialogModal = this.config.data.isInDialogModal;
        }

        if (this.config?.data?.vehicleToUpdate) {
            this.vehicleToUpdate = this.config.data.vehicleToUpdate;
        }
    }

    ngOnInit(): void {

        if (this.vehicleToUpdate) {
            this.ajoutVehiculeForm.patchValue({
                registration: this.vehicleToUpdate.registration,
                numberOfSeats: this.vehicleToUpdate.numberOfSeats,
                category: this.vehicleToUpdate.category.name,
                brand: this.vehicleToUpdate.model.brand.name,
                model: this.vehicleToUpdate.model.name,
                motorization: this.vehicleToUpdate.motorization.name,
                emission: this.vehicleToUpdate.emission,
                status: this.vehicleToUpdate.status,
                url: this.vehicleToUpdate.url,
                service: this.vehicleToUpdate.service
            });
        }
        this.ajoutVehiculeForm.valueChanges.subscribe();
        //TODO créer une méthode get pour requêter en base de données les catégories
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

    toUpperCase(value: string) {
        return value.toUpperCase();
    }

    onAdd(): void {
        this.submitted = true;

        if (this.ajoutVehiculeForm.valid) {

            const vehicle: Vehicle = {
                registration: this.toUpperCase(this.ajoutVehiculeForm.get('registration')?.value),
                numberOfSeats: this.ajoutVehiculeForm.get('numberOfSeats')?.value,
                service: isAdmin(this.authService.getUserRole()) ? this.ajoutVehiculeForm.get('service')?.value : false,
                emission: this.ajoutVehiculeForm.get('emission')?.value,
                url: this.ajoutVehiculeForm.get('url')?.value,
                status: this.ajoutVehiculeForm.get('status')?.value,
                motorization: {
                    name: this.ajoutVehiculeForm.get('motorization')?.value,
                },
                model: {
                    name: this.ajoutVehiculeForm.get('model')?.value,
                    brand: {
                        name: this.ajoutVehiculeForm.get('brand')?.value,
                    }
                },
                category: {
                    name: this.ajoutVehiculeForm.get('category')?.value,
                }
            };

            this.vehicleService.insertVehicleService(vehicle).subscribe({
                next: () => {
                    this.submitted = true
                    toast.success(`Véhicule ${vehicle.registration} ajouté avec succès`);
                    this.ajoutVehiculeForm.reset({
                        registration: '',
                        numberOfSeats: '',
                        category: '',
                        brand: '',
                        model: '',
                        motorization: '',
                        emission: '',
                        status: StatusVehicle.AVAILABLE,
                        url: '',
                        service: ''
                    });
                    this.submitted = false;
                },
                error: (error: HttpErrorResponse) => {
                    toast.error(error.error);
                }
            });

        } else {
            toast.warning('Veuillez compléter le formulaire.');
        }
    }

    onUpdate() {
        if (!this.vehicleToUpdate || !this.vehicleToUpdate.id) {
            toast.error('Impossible de mettre à jour le véhicule car l\'\identifiant est manquant.');
            return;
        }

        const updatedVehicle: Vehicle = {
            ...this.vehicleToUpdate,
            registration: this.toUpperCase(this.ajoutVehiculeForm.get('registration')?.value),
            numberOfSeats: this.ajoutVehiculeForm.get('numberOfSeats')?.value,
            category: {
                name: this.ajoutVehiculeForm.get('category')?.value,
            },
            model: {
                name: this.ajoutVehiculeForm.get('model')?.value,
                brand: {
                    name: this.ajoutVehiculeForm.get('brand')?.value,
                }
            },
            motorization: {
                name: this.ajoutVehiculeForm.get('motorization')?.value,
            },
            emission: this.ajoutVehiculeForm.get('emission')?.value,
            status: this.ajoutVehiculeForm.get('status')?.value,
            url: this.ajoutVehiculeForm.get('url')?.value,
            service: this.ajoutVehiculeForm.get('service')?.value,
        };

        this.vehicleService.updateVehicleService(updatedVehicle).subscribe({
            next: () => {
                toast.success(`Véhicule ${updatedVehicle.registration} mis à jour avec succès`);
                this.config.data.onClose();
            },
            error: (error) => {
                toast.error('Erreur lors de la mise à jour du véhicule');
                console.error(error);
            }
        });
    }

    onCancel() {
        if(this.vehicleToUpdate) {
            this.config.data.onClose();
        } else {
            this.router.navigate(['/vehicles/list']).then();
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.ajoutVehiculeForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Ce champ est requis';
        }
        if (control?.hasError('pattern') && controlName === 'registration') {
            return "Le format de la plaque d'immatriculation est invalide";
        }
        if (control?.hasError('pattern') && controlName === 'url') {
            return "L'URL est invalide";
        }
        if(control?.hasError)
        if (control?.hasError('min')) {
            return `La valeur saisie doit être supérieure à ${control.errors?.['min'].min}.`;
        }
        return '';
    }

    onUrlInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.ajoutVehiculeForm.get('urlImage')?.setValue(input.value);
    }

    filterCategory($event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = $event.query;

        for (let i = 0; i < (this.categorieTab as any).length; i++) {
            let category = this.categorieTab[i];
            if (category.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(category);
            }
        }
        this.filteredCategories = filtered;
    }

    filterMotorization($event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = $event.query;

        for (let i = 0; i < (this.motorizationTab as any).length; i++) {
            let motorization = this.motorizationTab[i];
            if (motorization.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(motorization);
            }
        }
        this.filteredMotorizations = filtered;

    }

    filterBrand($event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = $event.query;

        for (let i = 0; i < (this.brandTab as any).length; i++) {
            let brand = this.brandTab[i];
            if (brand.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(brand);
            }
        }
        this.filteredBrands = filtered;
    }

    filterStatus($event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = $event.query;

        for (let i = 0; i < (this.statusTab as any).length; i++) {
            let status = this.statusTab[i];
            if (status.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(status);
            }
        }
        this.filteredStatuses = filtered;
    }

    protected readonly isAdmin = isAdmin;
}
