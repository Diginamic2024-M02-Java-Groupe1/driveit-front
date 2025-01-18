import {Component, OnInit} from '@angular/core';
import {Vehicle} from "@models/vehicle";
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";
import {toast} from "ngx-sonner";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-lister-vehicules',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './lister-vehicules.component.html',
  styleUrl: './lister-vehicules.component.scss'
})
export class ListerVehiculesComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleDataService) {}

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

  
}
