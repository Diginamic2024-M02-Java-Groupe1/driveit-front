import {Component} from '@angular/core';
import {FormComponent} from '@components/ajout-vehicle-service/ajoutForm/form.component';
import {NgOptimizedImage} from '@angular/common';
import {ImageVehiculeComponent} from '@components/ajout-vehicle-service/imageVehicule/image-vehicule.component';
import {VehicleDataService} from "@services/ajoutVehiculeService/vehicle-data.service";

@Component({
  selector: 'app-visualisation-ajout-vehicule',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './visualisation-ajout-vehicule.component.html',
  styleUrls: ['./visualisation-ajout-vehicule.component.scss']
})
export class VisualisationAjoutVehiculeComponent {


  constructor(protected vehicleDataService: VehicleDataService) {

  }
}
