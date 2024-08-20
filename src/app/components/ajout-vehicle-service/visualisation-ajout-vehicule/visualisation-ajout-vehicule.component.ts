import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";

@Component({
  selector: 'app-visualisation-ajout-vehicule',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './visualisation-ajout-vehicule.component.html',
  styleUrls: ['./visualisation-ajout-vehicule.component.scss']
})
export class VisualisationAjoutVehiculeComponent {

  constructor(protected vehicleDataService: VehicleDataService) {

  }
}
