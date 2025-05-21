import {Component, OnInit} from '@angular/core';
import {toast} from "ngx-sonner";
import {TableModule} from "primeng/table";
import {VehicleService} from "@services/vehicle/vehicle.service";
import {Vehicle} from "@models/vehicle.model";
import {NgForOf, NgClass, NgOptimizedImage} from "@angular/common";
import {Button} from "primeng/button";
import {Router} from "@angular/router";
import {DialogModalService} from "@services/dialog-modal/dialog-modal.service";
import {
    FormVehiculeComponent
} from "@components/service-vehicles/form-vehicule/form-vehicule/form-vehicule.component";

@Component({
    selector: 'app-lister-vehicules',
    standalone: true,
    imports: [
        TableModule,
        NgForOf,
        NgClass,
        Button
    ],
    templateUrl: './lister-vehicules.component.html',
    styleUrl: './lister-vehicules.component.scss'
})
export class ListerVehiculesComponent implements OnInit {

    vehicles: Vehicle[] = [];

    constructor(
        private vehicleService: VehicleService,
        private router: Router,
        private dialogModalService: DialogModalService
    ) {
    }

    ngOnInit(): void {
        this.loadVehicles();
    }

    loadVehicles(): void {
        this.vehicleService.getVehicles().subscribe({
            next: (data: Vehicle[]) => {
                this.vehicles = data;
            },
            error: (error) => {
                toast.error('Erreur lors du chargement des véhicules');
                console.error(error);
            }
        });
    }

    isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    onSeeDetails(vehicle: Vehicle): void {
        if (vehicle.id) {
            let ref = this.dialogModalService.show(FormVehiculeComponent, {
                header: 'Editer un véhicule',
                width: '75%',
                closeOnEscape: true,
                draggable: true,
                resizable: true,
                position: 'center',
                data: {
                    isInDialogModal: true,
                    vehicleToUpdate: vehicle,
                    onClose: () => {
                        ref.close();
                    }
                }
            });
        }
    }

    onDelete(vehicle: Vehicle): void {
        if (vehicle.id) {
            this.vehicleService.deleteVehicle(vehicle.id).subscribe({
                next: () => {
                    toast.success('Véhicule supprimé avec succès');
                    this.loadVehicles();
                },
                error: (error) => {
                    toast.error('Erreur lors de la suppression du véhicule');
                    console.error(error);
                }
            });
        }
    }

    onAddVehicle() {
        this.router.navigate(['vehicles/add']).then();
    }
}
