import { Routes } from '@angular/router';
import {AuthComponent} from "@components/auth/auth.component";
import {ResaVehicleComponent} from "@components/resa-vehicle/resa-vehicle.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "@components/not-found/not-found.component";
import {FormComponent} from "@components/vehicle-service/ajout-vehicule/ajoutForm/form.component";
import {
  VehicleReservationLayoutComponent
} from "@components/vehicle-reservation-layout/vehicle-reservation-layout.component";

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
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'VehicleReserveHistory',
    component: VehicleReservationLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
