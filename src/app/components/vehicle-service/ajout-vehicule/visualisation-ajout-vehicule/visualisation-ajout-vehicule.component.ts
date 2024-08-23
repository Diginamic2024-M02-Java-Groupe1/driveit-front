import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

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
  @Input() formValues: any;

  constructor() {
  }
}
