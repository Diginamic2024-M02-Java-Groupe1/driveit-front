import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { ResaVehicleComponent } from '@components/resa-vehicle/resa-vehicle.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import {LoginComponent} from "@components/auth/login/login.component";
import {RegisterComponent} from "@components/auth/register/register.component";
import {FormComponent} from "@components/vehicle-service/ajout-vehicule/ajoutForm/form.component";
import {
  VehicleReservationLayoutComponent
} from "@components/vehicle-reservation-layout/vehicle-reservation-layout.component";
import {VerifyComponent} from "@components/auth/verify/verify.component";


export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'reserver-vehicule',
        pathMatch: 'full'
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
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
