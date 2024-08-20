import {Component} from '@angular/core';
import {FormComponent} from "@components/ajout-vehicle-service/ajoutForm/form.component";
import {
  VisualisationAjoutVehiculeComponent
} from "@components/ajout-vehicle-service/visualisation-ajout-vehicule/visualisation-ajout-vehicule.component";

@Component({
  selector: 'app-ajout-vehicle-service',
  standalone: true,
  imports: [
    FormComponent,
    VisualisationAjoutVehiculeComponent
  ],
  templateUrl: './ajout-vehicle-service.component.html',
  styleUrl: './ajout-vehicle-service.component.scss'
})
export class AjoutVehicleServiceComponent {

}
