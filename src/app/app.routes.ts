import { Routes } from '@angular/router';
import {AuthComponent} from "@components/auth/auth.component";
import {ResaVehicleComponent} from "@components/resa-vehicle/resa-vehicle.component";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path:'reserver-vehicule',component:ResaVehicleComponent},
];
