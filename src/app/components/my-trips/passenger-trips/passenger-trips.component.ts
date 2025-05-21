import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import {FilterFormComponent} from "@components/filter-form/filter-form.component";
import {CarpoolingService} from "@services/carpooling.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "@services/auth.service";
import {Carpooling} from "@models/carpooling.model";
import {DatePipe, NgClass} from "@angular/common";
import {Address} from "@models/address.model";
import {GenericFilterConfig} from "@components/filter-form/filter-form.component";


@Component({
  selector: 'app-passenger-trips',
  standalone: true,
  imports: [
    FilterFormComponent,
    DatePipe,
    NgClass
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
  protected expandedTripIds: number[] = [];


  protected filterFields: GenericFilterConfig<any>[] = [
    {
      name: 'departureAddress',
      type: 'text',
      label: 'Lieu de départ'
    },
    {
      name: 'arrivalAddress',
      type: 'text',
      label: 'Lieu d\'arrivée'
    },
    {
      name: 'tripDate',
      type: 'date',
      label: 'Date du trajet'
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      options: [
        { label: 'Tous', value: '' },
        { label: 'Accepté', value: 'ACCEPTED' },
        { label: 'En attente', value: 'PENDING' },
        { label: 'Refusé', value: 'REFUSED' }
      ]
    }
  ];

  protected filteredCarpoolings: Carpooling[] = [];
  protected filterValues: any = {};

  ngOnInit(): void {
    this.getMyTrips();
  }

  getMyTrips(): void {
    this.carpoolingService.getCarpoolingsForParticipants().pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
      next: (data) => {
        this.carpoolings = data;
        this.applyFilters();
        console.log('Carpoolings:', this.carpoolings);
      }
    });
  }

  onFilterSubmit(formData: any): void {
    this.filterValues = formData;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredCarpoolings = this.carpoolings.filter(carpooling => {
      // Filtre par statut
      if (this.filterValues.status && carpooling.status !== this.filterValues.status) {
        return false;
      }

      // Filtre par date
      if (this.filterValues.tripDate) {
        const filterDate = new Date(this.filterValues.tripDate);
        const carpoolingDate = new Date(carpooling.departureDate);

        if (filterDate.toDateString() !== carpoolingDate.toDateString()) {
          return false;
        }
      }

      // Filtre par adresse de départ
      if (this.filterValues.departureAddress) {
        const departureAddress = `${carpooling.departureAddress.streetNumber} ${carpooling.departureAddress.streetName}`.toLowerCase();
        if (!departureAddress.includes(this.filterValues.departureAddress.toLowerCase())) {
          return false;
        }
      }

      // Filtre par adresse d'arrivée
      if (this.filterValues.arrivalAddress) {
        const arrivalAddress = `${carpooling.arrivalAddress.streetNumber} ${carpooling.arrivalAddress.streetName}`.toLowerCase();
        if (!arrivalAddress.includes(this.filterValues.arrivalAddress.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }

  removeMeFromCarpooling(carpoolingId: number): void {
    const participantId = this.authService.getUserId();
    if (!participantId) return;
    this.carpoolingService.removeParticipant(carpoolingId, parseInt(participantId))
        .subscribe({
          next: () => this.getMyTrips(),
          error: err => console.error('Erreur lors du retrait du participant', err)
        });
  }

  toggleDetails(carpoolingId: number): void {
    const index = this.expandedTripIds.indexOf(carpoolingId);
    if (index === -1) {
      this.expandedTripIds.push(carpoolingId);
    } else {
      this.expandedTripIds.splice(index, 1);
    }
  }

  isExpanded(carpoolingId: number): boolean {
    return this.expandedTripIds.includes(carpoolingId);
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

  getAdress(address: Address): {line1: string, line2: string} {
    return {
      line1: `${address.streetNumber} ${address.streetName}`,
      line2: `${address.cityZipCode.code} ${address.cityZipCode.city}`
    };
  }

  getStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'ACCEPTED': 'acceptée',
      'PENDING': 'en attente',
      'REFUSED': 'refusée'
    };
    return statusMap[status] || status;
  }
}
