import {Component, OnInit, output} from '@angular/core';
import {toast} from "ngx-sonner";
import {TableModule} from "primeng/table";
import {VehicleService} from "@services/vehicle/vehicle.service";
import {Vehicle} from "@models/vehicle.model";
import {NgForOf, NgClass, NgOptimizedImage} from "@angular/common";
import {Button} from "primeng/button";
import {Router} from "@angular/router";
import {EditVehicleComponent} from "@components/service-vehicles/edit-vehicle/edit-vehicle.component";

@Component({
    selector: 'app-lister-vehicules',
    standalone: true,
  imports: [
    TableModule,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    Button,
    EditVehicleComponent
  ],
    templateUrl: './lister-vehicules.component.html',
    styleUrl: './lister-vehicules.component.scss'
})
export class ListerVehiculesComponent implements OnInit {

    vehicles: Vehicle[] = [];
    isEditDialogVisible = false;

    constructor(
        private vehicleService: VehicleService,
        private router: Router) {
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
        if(vehicle.id) {
          this.isEditDialogVisible = true;
          // emit id vehicule
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
