import { Routes } from '@angular/router';
import {AuthComponent} from "@components/auth/auth.component";
import {ResaVehicleComponent} from "@components/resa-vehicle/resa-vehicle.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "@components/not-found/not-found.component";
import {FormComponent} from "@components/ajout-vehicle-service/ajoutForm/form.component";

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
    // canActivate: [AuthGuard]
  },
  {
    path: 'ajout-vehicule',
    component: FormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
