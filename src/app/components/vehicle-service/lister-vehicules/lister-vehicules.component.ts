import {Component, OnInit} from '@angular/core';
import {toast} from "ngx-sonner";
import {TableModule} from "primeng/table";
import {VehicleService} from "@services/vehicle/vehicle.service";
import {Vehicle} from "@models/vehicle.model";
import {NgForOf, NgClass, NgOptimizedImage} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-lister-vehicules',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    Button
  ],
  templateUrl: './lister-vehicules.component.html',
  styleUrl: './lister-vehicules.component.scss'
})
export class ListerVehiculesComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

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

  onEdit(vehicle: Vehicle): void {
    if(vehicle.id) {
        this.vehicleService.updateVehicleService(vehicle.id).subscribe({
            next: () => {
            toast.success('Véhicule modifié avec succès');
            },
            error: (error) => {
            toast.error('Erreur lors de la modification du véhicule');
            console.error(error);
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

}
