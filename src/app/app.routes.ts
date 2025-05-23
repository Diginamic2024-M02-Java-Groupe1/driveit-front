import {Routes} from '@angular/router';
import {AuthLayoutComponent} from '@layouts/auth-layout/auth-layout.component';
import {AuthGuard} from '@guards/auth.guard';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {MainLayoutComponent} from '@layouts/main-layout/main-layout.component';

import {FormCarpoolingComponent} from "@features/carpooling/components/forms/form-carpooling/form-carpooling.component";
import {VerifyComponent} from "@features/auth/components/verify/verify.component";
import {VehicleListComponent} from '@features/vehicle/shared/vehicle-list/vehicle-list.component';
import {
  VehicleBookingHistoryComponent
} from './components/vehicle/vehicle-booking-history/vehicle-booking-history.component';
import {FormComponent} from './components/vehicle-service/ajout-vehicule/ajoutForm/form.component';
import {
  ReservationsServiceVehiclesComponent
} from './components/vehicle/service/reservations-service-vehicles/reservations-service-vehicles.component';
import {PassengerTripsList} from '@features/trip/components/passenger/passenger-trips-list/passenger-trips-list';

import {SERVICE_VEHICLE_ROUTES} from '@features/vehicle/service/routes';
import {PARTICULAR_VEHICLE_ROUTES} from '@features/vehicle/particular/routes';
import {DRIVER_TRIP_ROUTES} from '@features/trip/components/driver/routes';
import {PASSENGER_TRIP_ROUTES} from '@features/trip/components/passenger/routes';
import {AUTH_ROUTES} from '@features/auth/routes';


export const oldRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
        component: FormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicles/list',
        component: VehicleListComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'vehicles/service/booking/history',
        component: VehicleBookingHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'creation-covoiturage',
        component: FormCarpoolingComponent,
        canActivate: [AuthGuard]
      },
        {
          path:'trip',
          component:PassengerTripsList,
            canActivate: [AuthGuard]
        }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [...AUTH_ROUTES]
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

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'vehicles', children: [...SERVICE_VEHICLE_ROUTES, ...PARTICULAR_VEHICLE_ROUTES] },
      { path: 'trips', children: [...DRIVER_TRIP_ROUTES, ...PASSENGER_TRIP_ROUTES] },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [...AUTH_ROUTES]
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
