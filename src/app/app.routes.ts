import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { ReservationsServiceVehiclesComponent } from '@components/service-vehicles/reservations-service-vehicles/reservations-service-vehicles.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import {LoginComponent} from "@components/auth/login/login.component";
import {RegisterComponent} from "@components/auth/register/register.component";
import {FormVehiculeComponent} from "@components/service-vehicles/form-vehicule/form-vehicule/form-vehicule.component";

import {CovoiturageFormComponent} from "@components/covoiturage-form/covoiturage-form.component";
import {VerifyComponent} from "@components/auth/verify/verify.component";
import {VehicleBookingHistoryComponent} from "@components/service-vehicles/vehicle-booking-history/vehicle-booking-history.component";
import {ListerVehiculesComponent} from "@components/service-vehicles/lister-vehicules/lister-vehicules.component";
import {PassengerTripsComponent} from "@components/my-trips/passenger-trips/passenger-trips.component";


export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'vehicles/service/booking',
        pathMatch: 'full'
      },
      {
        path: 'vehicles/service/booking',
        component: ReservationsServiceVehiclesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicles/add',
        component: FormVehiculeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicles/list',
        component: ListerVehiculesComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'vehicles/service/booking/history',
        component: VehicleBookingHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'creation-covoiturage',
        component: CovoiturageFormComponent,
        canActivate: [AuthGuard]
      },
        {
          path:'passenger-trips',
          component:PassengerTripsComponent,
            canActivate: [AuthGuard]
        }
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
      }
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
