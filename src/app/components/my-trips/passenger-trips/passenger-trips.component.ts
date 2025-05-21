import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import {FilterFormComponent} from "@components/filter-form/filter-form.component";
import {CarpoolingService} from "@services/carpooling.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "@services/auth.service";
import {Carpooling} from "@models/carpooling.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-passenger-trips',
  standalone: true,
  imports: [
    FilterFormComponent,
    DatePipe
  ],
  templateUrl: './passenger-trips.component.html',
  styleUrl: './passenger-trips.component.scss'
})
export class PassengerTripsComponent implements OnInit {

  private readonly carpoolingService = inject(CarpoolingService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef$ = inject(DestroyRef);

  protected results: any[] = [];
  protected carpoolings: Carpooling[] = [];

  // protected filterFields: FilterField[] = [
  //   {
  //     name: 'tripDate',
  //     type: 'date',
  //     label: 'Date du trajet'
  //   }
  // ];

  ngOnInit(): void {
    this.getMyTrips();
    console.log(this.authService.getUserId());
  }

  getMyTrips(): void {
    this.carpoolingService.getCarpoolings().pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
      next: (data) => {
        this.carpoolings = data;
        console.log('Carpoolings:', this.carpoolings);
      }
    });
  }

  onFilterSubmit(formData: any): void {
    console.log('Données du filtre:', formData);
  }

  getOrganizer(carpooling: Carpooling): string {
    return `${carpooling.organizer.firstName} ${carpooling.organizer.lastName}`;
  }

  getAvailableSeats(carpooling: Carpooling): string {
    const seatsAvailable = carpooling.vehicle.numberOfSeats - carpooling.participants.length;
    let texte = seatsAvailable> 1 ? 'places disponibles' : 'place disponible';
    return `${seatsAvailable} ${texte} sur ${carpooling.vehicle.numberOfSeats}`;
  }

  getVehicle(carpooling: Carpooling): string {
    return `${carpooling.vehicle.model.brand.name} ${carpooling.vehicle.model.name}`;
  }
}
