import { Routes } from '@angular/router';
import {AuthComponent} from "@components/auth/auth.component";
import {ResaVehicleComponent} from "@components/resa-vehicle/resa-vehicle.component";
import {AuthGuard} from "./guards/auth.guard";
import {AjoutVehicleServiceComponent} from "@components/ajout-vehicle-service/modal/ajout-vehicle-service.component";
import {NotFoundComponent} from "@components/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/reserver-vehicule',
    pathMatch: 'full'
  },
  { path: 'auth',
    component: AuthComponent
  },
  {
    path: 'reserver-vehicule',
    component: ResaVehicleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ajoutVehicule',
    component: AjoutVehicleServiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
