import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormVehiculeComponent} from "@components/service-vehicles/form-vehicule/form-vehicule/form-vehicule.component";
import {AuthService} from "@services/auth.service";
import {isAdmin} from "@utils/isAdmin.util";

@Component({
  selector: 'app-visualisation-form-vehicule',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './visualisation-form-vehicule.component.html',
  styleUrls: ['./visualisation-form-vehicule.component.scss']
})
export class VisualisationFormVehiculeComponent implements OnInit{
  @Input() formValues: any;

  protected readonly FormComponent = FormVehiculeComponent;
  protected authService = inject(AuthService);

  constructor() {

  }
  ngOnInit(): void {
    //todo pour chacun des selects, faire en sorte que les formcontrol récupère les valeurs en base on init
  }


  protected readonly isAdmin = isAdmin;
}
