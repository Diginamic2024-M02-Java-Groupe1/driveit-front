import {Component, DestroyRef, inject,OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FilterFormComponent, GenericFilterConfig} from "@components/filter-form/filter-form.component";
import {CarpoolingService} from "@services/carpooling.service";
import {ActivatedRoute} from "@angular/router";
import {Carpooling} from "@models/carpooling.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {toast} from "ngx-sonner";
import {Address} from "@models/address.model";
import {ErrorHandlerService} from "@services/error-handler.service";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-driver-trips',
  standalone: true,
  imports: [
    DatePipe,
    FilterFormComponent,
    InputTextModule,
    ButtonDirective,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './driver-trips.component.html',
  styleUrl: './driver-trips.component.scss'
})
export class DriverTripsComponent implements OnInit {
  private readonly carpoolingService = inject(CarpoolingService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandlerService);

  protected carpoolings: Carpooling[] = [];
  protected filteredCarpoolings: Carpooling[] = [];
  protected filterFields: GenericFilterConfig<any>[] = [];
  protected filterValues: any = {};

  ngOnInit(): void {
    this.initializeFromRouteData();
  }

  private initializeFromRouteData(): void {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe(() => {
        this.setupFilterFields();
          this.getMyTrips();
        });
  }

  private setupFilterFields(): void {
    const commonFields: GenericFilterConfig<any>[] = [
      {
        name: 'tripDate',
        type: 'date',
        label: 'Date du trajet'
      }
    ];

    this.filterFields = commonFields;
  }

  protected getMyTrips(): void {
    this.carpoolingService.getCarpoolingsByOrganizer()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (data) => {
          this.carpoolings = data;
          this.onFilterSubmit(this.filterValues);
        },
        error: (err) => this.errorHandler.handleError(err),
      });
  }


  protected onFilterSubmit(formData: any): void {
    this.filterValues = formData;
    this.filteredCarpoolings = this.carpoolings.filter(carpooling => {

      if (this.filterValues.tripDate) {
        const filterDate = new Date(this.filterValues.tripDate);
        const carpoolingDate = new Date(carpooling.departureDate);

        if (filterDate.toDateString() !== carpoolingDate.toDateString()) {
          return false;
        }
      }

      return true;
    });
  }

  acceptPassenger(idCollab:number, idCarpooling:number){
    this.carpoolingService.updateParticipantStatus(idCollab,idCarpooling, 'ACCEPTED')
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: () => {
          toast.success('Participant validé avec succès');
          this.getMyTrips();
        },
        error: (err) => this.errorHandler.handleError(err),
      });
  }

  declinePassenger(idCollab:number, idCarpooling:number){
    this.carpoolingService.updateParticipantStatus(idCollab,idCarpooling, 'REFUSED')
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: () => {
          toast.success('Participant validé avec succès');
          this.getMyTrips();
        },
        error: (err) => this.errorHandler.handleError(err),
      });
  }

  protected onFilterReset(): void {
    this.filterValues = {};
    this.filteredCarpoolings = [...this.carpoolings];
  }

  protected getAvailableSeats(carpooling: Carpooling): string {
    var collabValidated = carpooling.participants.filter((participant) => participant.status === 'ACCEPTED');
    const seatsAvailable = carpooling.vehicle.numberOfSeats - collabValidated.length -1;
    if (seatsAvailable === 0) {
      return "Complet";
    }
    const texte = seatsAvailable > 1 ? 'places disponibles' : 'place disponible';
    return `${seatsAvailable} ${texte} sur ${carpooling.vehicle.numberOfSeats}`;
  }

  getParticipantsValidated(carpooling: Carpooling): number {
    return carpooling.participants.filter((participant) => participant.status === 'ACCEPTED').length;
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


}
