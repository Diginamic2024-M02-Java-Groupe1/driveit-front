import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormComponent} from "@components/vehicle-service/ajout-vehicule/ajoutForm/form.component";

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
export class VisualisationAjoutVehiculeComponent implements OnInit{
  @Input() formValues: any;

  protected readonly FormComponent = FormComponent;

  constructor() {

  }
  ngOnInit(): void {
    //todo pour chacun des selects, faire en sorte que les formcontrol récupère les valeurs en base on init
  }



}
