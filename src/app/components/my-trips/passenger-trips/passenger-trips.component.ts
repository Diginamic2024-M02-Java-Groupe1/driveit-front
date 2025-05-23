import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import {CarpoolingService} from "@services/carpooling.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "@services/auth.service";
import {Carpooling} from "@models/carpooling.model";
import {DatePipe, NgClass} from "@angular/common";
import {Address} from "@models/address.model";
import {ActivatedRoute} from "@angular/router";
import {Button} from "primeng/button";
import {FilterFormComponent,GenericFilterConfig} from "../../filter-form/filter-form.component";
import {toast} from "ngx-sonner";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-passenger-trips',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    Button,
    FilterFormComponent
  ],
  templateUrl: './passenger-trips.component.html',
  styleUrl: './passenger-trips.component.scss'
})
export class PassengerTripsComponent implements OnInit {
  private readonly carpoolingService = inject(CarpoolingService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef$ = inject(DestroyRef);

  protected carpoolings: Carpooling[] = [];
  protected expandedTripIds: number[] = [];
  protected isReserveTrip: boolean = false;
  protected filterFields: GenericFilterConfig<any>[] = [];
  protected filteredCarpoolings: Carpooling[] = [];
  protected filterValues: any = {};
  protected cityOptions: any[] = [];

  ngOnInit(): void {
    this.loadAvailableCities();
    this.initializeFromRouteData();
  }

  private loadAvailableCities(): void {
    this.carpoolingService.getCities()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (data) => {
          this.cityOptions = data.map((city: string) => ({ label: city, value: city }));
        },
        error: (error) => {
          console.error('Erreur lors du chargement des villes:', error);
          toast.error('Impossible de charger la liste des villes');
        }
      });
  }

  private initializeFromRouteData(): void {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe(data => {
        this.isReserveTrip = !!data['isPassengerReserveTrip'];
        this.setupFilterFields();

        if (!this.isReserveTrip) {
          this.getMyTrips();
        }
      });
  }

  private setupFilterFields(): void {
    // Champs communs aux deux modes
    const commonFields: GenericFilterConfig<any>[] = [
      this.createAddressField('departureAddress', 'Lieu de départ'),
      this.createAddressField('arrivalAddress', 'Lieu d\'arrivée'),
      {
        name: 'tripDate',
        type: 'date',
        label: 'Date du trajet'
      }
    ];

    // Uniquement pour mes trajets (pas pour la réservation)
    if (!this.isReserveTrip) {
      this.filterFields = [
        ...commonFields,
        {
          name: 'status',
          type: 'select',
          label: 'Statut',
          options: [
            { label: '', value: '' },
            { label: 'Accepté', value: 'ACCEPTED' },
            { label: 'En attente', value: 'PENDING' },
            { label: 'Refusé', value: 'REFUSED' }
          ]
        }
      ];
    } else {
      this.filterFields = commonFields;
    }
  }

  private createAddressField(name: string, label: string): GenericFilterConfig<any> {
    return {
      name,
      type: 'autocomplete',
      label,
      placeholder: 'Sélectionnez une ville',
      suggestions: [],
      dropdown: true,
      optionLabel: 'value',
      optionValue: 'value',
      filterMethod: (event: any) => this.filterCityOptions(event, name)
    };
  }

  private filterCityOptions(event: any, fieldName: string): void {
    const filtered = this.cityOptions.filter(city =>
      city.value.toLowerCase().includes(event.query.toLowerCase())
    );

    const fieldIndex = this.filterFields.findIndex(f => f.name === fieldName);
    if (fieldIndex !== -1) {
      this.filterFields[fieldIndex] = {
        ...this.filterFields[fieldIndex],
        suggestions: [...filtered]
      };
    }
  }

  protected getMyTrips(): void {
    this.carpoolingService.getCarpoolingsForParticipants()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (data) => {
          this.carpoolings = data;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des covoiturages:', error);
          toast.error('Impossible de récupérer vos trajets');
        }
      });
  }

  protected getCarpoolings(departCity: string, arrivalCity: string, date: Date): void {
    this.carpoolingService.searchCarpoolings(departCity, arrivalCity, date)
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (data) => {
          if(!data || data.length === 0) {
            toast.info('Aucun covoiturage trouvé pour cette recherche');
            this.filteredCarpoolings = [];
            return;
          }
          this.filteredCarpoolings = data;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche de covoiturages:', error);
          toast.error('La recherche de covoiturages a échoué');
        }
      });
  }

  protected onFilterSubmit(formData: any): void {
    this.filterValues = formData;

    if (this.isReserveTrip) {
      const departCity = this.filterValues.departureAddress;
      const arrivalCity = this.filterValues.arrivalAddress;
      const tripDate = this.filterValues.tripDate;
      if(!departCity || !arrivalCity || !tripDate) {
        toast.error('Veuillez remplir tous les champs de recherche');
        return;
      }
      this.getCarpoolings(departCity, arrivalCity, tripDate);
    } else {
      this.applyFilters();
    }
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

        // Compare seulement les dates (pas les heures)
        if (filterDate.toDateString() !== carpoolingDate.toDateString()) {
          return false;
        }
      }

      // Filtre par ville de départ
      if (this.filterValues.departureAddress) {
        const cityName = carpooling.departureAddress.cityZipCode.city.toLowerCase();
        if (cityName !== this.filterValues.departureAddress.toLowerCase()) {
          return false;
        }
      }

      // Filtre par ville d'arrivée
      if (this.filterValues.arrivalAddress) {
        const cityName = carpooling.arrivalAddress.cityZipCode.city.toLowerCase();
        if (cityName !== this.filterValues.arrivalAddress.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }

  protected removeMeFromCarpooling(carpoolingId: number): void {
    const participantId = this.authService.getUserId();
    if (!participantId) {
      toast.error('Impossible d\'identifier l\'utilisateur courant');
      return;
    }

    this.carpoolingService.removeParticipant(carpoolingId, parseInt(participantId))
      .subscribe({
        next: () => {
          toast.success('Vous avez été retiré du covoiturage');
          this.getMyTrips();
        },
        error: (err) => {
          console.error('Erreur lors du retrait du participant', err);
          toast.error('Impossible de vous retirer du covoiturage');
        }
      });
  }

  protected reserveTrip(carpoolingId: number): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      toast.error('Vous devez être connecté pour réserver un trajet');
      return;
    }
    this.carpoolingService.addParticipant(carpoolingId, parseInt(userId))
      .subscribe({
        next: () => {
          toast.success('Réservation réussie');
          this.getCarpoolings(this.filterValues.departureAddress, this.filterValues.arrivalAddress, this.filterValues.tripDate);
        },
        error: (err:HttpErrorResponse) => {
          toast.error(err.error);
        }
      });

  }

  protected toggleDetails(carpoolingId: number): void {
    const index = this.expandedTripIds.indexOf(carpoolingId);
    if (index === -1) {
      this.expandedTripIds.push(carpoolingId);
    } else {
      this.expandedTripIds.splice(index, 1);
    }
  }

  protected onFilterReset(): void {
    this.filterValues = {};

    if (this.isReserveTrip) {
      this.filteredCarpoolings = [];
    } else {
      this.filteredCarpoolings = [...this.carpoolings];
    }
  }

  protected isExpanded(carpoolingId: number): boolean {
    return this.expandedTripIds.includes(carpoolingId);
  }

  protected getOrganizer(carpooling: Carpooling): string {
    return `${carpooling.organizer.firstName} ${carpooling.organizer.lastName}`;
  }

  protected getAvailableSeats(carpooling: Carpooling): string {
    const seatsAvailable = carpooling.vehicle.numberOfSeats - carpooling.participants.length;
    if (seatsAvailable === 0) {
      return "Complet";
    }
    const texte = seatsAvailable > 1 ? 'places disponibles' : 'place disponible';
    return `${seatsAvailable} ${texte} sur ${carpooling.vehicle.numberOfSeats}`;
  }

  protected getVehicle(carpooling: Carpooling): string {
    return `${carpooling.vehicle.model.brand.name} ${carpooling.vehicle.model.name}`;
  }

  protected getAdress(address: Address): {line1: string, line2: string} {
    return {
      line1: `${address.streetNumber} ${address.streetName}`,
      line2: `${address.cityZipCode.code} ${address.cityZipCode.city}`
    };
  }

  protected getStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'ACCEPTED': 'acceptée',
      'PENDING': 'en attente',
      'REFUSED': 'refusée'
    };
    return statusMap[status] || status;
  }
}
