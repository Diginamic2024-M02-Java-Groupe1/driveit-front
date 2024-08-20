import { Routes } from '@angular/router';
import {AuthComponent} from "@components/auth/auth.component";
import {AjoutVehicleServiceComponent} from "@components/ajout-vehicle-service/modal/ajout-vehicle-service.component";

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'ajoutVehicule',
    component: AjoutVehicleServiceComponent
  }
];
