import {Component, OnInit} from '@angular/core';
import {toast} from "ngx-sonner";
import {TableModule} from "primeng/table";
import {VehicleService} from "@services/vehicle.service";
import {Vehicle} from "@models/vehicle.model";
import {NgClass} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";
import {ImageModule} from "primeng/image";
import {UrlValidator} from '@validators/url.validator';
import {BadgeModule} from 'primeng/badge';
import {DialogModalService} from "@services/dialog-modal.service"
import {FormVehicleComponent} from '../../service/components/forms/form-vehicle/form-vehicle.component';

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
  imports: [
    NgClass,
    BadgeModule,
    ButtonModule,
    ImageModule,
    TableModule,
    TooltipModule,
  ],
    templateUrl: './vehicle-list.component.html',
    styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[] = [];

    constructor(
        private vehicleService: VehicleService,
        private dialogModalService: DialogModalService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.loadVehicles();
    }

    loadVehicles(): void {
        this.vehicleService.getServiceVehicles().subscribe({
            next: (data: Vehicle[]) => {
                this.vehicles = data;
            },
            error: (error) => {
                toast.error('Erreur lors du chargement des véhicules');
                console.error(error);
            }
        });
    }

  loadVehicle(id: number): void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (data: Vehicle) => {
        const index = this.vehicles.findIndex(v => v.id === id);
        if (index !== -1) {
          this.vehicles[index] = data;
          this.vehicles = [...this.vehicles];
        }
      },
      error: (error) => {
        toast.error('Erreur lors du chargement du véhicule');
        console.error(error);
      }
    });
  }

    getEmissionSeverity(emission: number): "secondary" | "success" | "danger" | "warn" {
      if (emission === 0) return 'success'; // Electric vehicles (0 emissions) get success
      if (emission === null || emission === undefined) return 'secondary'; // Missing data
      if (emission <= 95) return 'success';  // Low emission
      if (emission <= 160) return 'warn';    // Medium emission
      return 'danger';                       // High emission
    }

    getEmissionLabel(emission: number): string {
      if (emission === 0) return 'Électrique (0 CO₂)';
      if (!emission) return 'N/A';
      return `${emission} CO₂/km`;
    }

    isValidUrl(url: string): boolean {
        return UrlValidator.isValid(url);
    }

    onUpdate(vehicle: Vehicle): void {
      if (vehicle.id !== undefined) {
        let ref = this.dialogModalService.show(FormVehicleComponent, {
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
              if (vehicle.id !== undefined) {
                this.loadVehicle(vehicle.id);
              }
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

    onFilter(value: any) {
        console.log(value);
    }
}
