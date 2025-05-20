import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {AjoutVehiculeComponent} from "@components/service-vehicles/ajout-vehicule/ajout-vehicule/ajout-vehicule.component";

@Component({
  selector: 'app-visualisation-ajout-vehicule',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './visualisation-ajout-vehicule.component.html',
  styleUrls: ['./visualisation-ajout-vehicule.component.scss']
})
export class VisualisationAjoutVehiculeComponent implements OnInit{
  @Input() formValues: any;

  protected readonly FormComponent = AjoutVehiculeComponent;

  constructor() {

  }
  ngOnInit(): void {
    //todo pour chacun des selects, faire en sorte que les formcontrol récupère les valeurs en base on init
  }



}
