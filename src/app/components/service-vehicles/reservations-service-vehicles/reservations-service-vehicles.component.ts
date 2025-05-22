import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CarouselModule} from 'primeng/carousel';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Vehicle} from "@models/vehicle.model";
import {BookingVehicleService} from "@services/booking-vehicle.service";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {CalendarModule} from "primeng/calendar";
import {toast} from "ngx-sonner";
import {HttpErrorResponse} from "@angular/common/http";
import {dateRangeValidator} from "@validators/date-range.validator";
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-reservations-service-vehicles',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CarouselModule,
    TagModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './reservations-service-vehicles.component.html',
  styleUrl: './reservations-service-vehicles.component.scss'
})
export class ReservationsServiceVehiclesComponent implements OnInit {

  /** form to filter vehicles **/
  filterForm: FormGroup;
  showCarousel: boolean = false;
  filteredVehicles: ResaVehicle[] = [];
  currentDate: Date = new Date();
  isLoading: boolean = false;

  constructor(private readonly resaVehicleService: BookingVehicleService) {
    this.filterForm = new FormGroup({
      startDateTime: new FormControl<Date | null>(null, Validators.required),
      endDateTime: new FormControl<Date | null>(null, Validators.required)
    }, { validators: dateRangeValidator() });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(() => {
      this.showCarousel = false;
      if (this.filterForm.hasError('dateRangeInvalid')) {
        toast.error('La date de fin doit être postérieure à la date de début.');
      }
    });
  }

  /**
   * Fetches available vehicles for the selected date range
   */
  onFilter() {
    if (this.filterForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { startDateTime, endDateTime } = this.filterForm.value;
      const startDate = startDateTime.toISOString();
      const endDate = endDateTime.toISOString();
      this.resaVehicleService.getAvailableVehicles(startDate, endDate)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (data: ResaVehicle[]) => {
            this.filteredVehicles = data;
            this.showCarousel = true;
          },
          error: (error) => {
            console.error('Error fetching filtered vehicles', error);
            toast.error('Erreur lors de la recherche de véhicules');
          }
        });
    }
  }

  /**
   * Reserves a vehicle for the selected date range
   * @param vehicle : Vehicle : vehicle to reserve
   */
  reserveVehicle(vehicle: Vehicle) {
    if (this.isLoading) return;

    this.isLoading = true;
    const reservationData: ResaVehicle = {
      dateTimeStart: this.filterForm.get('startDateTime')?.value.toISOString(),
      dateTimeEnd: this.filterForm.get('endDateTime')?.value.toISOString(),
      vehicle: vehicle
    };
    this.resaVehicleService.reserveVehicle(reservationData)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          this.onFilter();
          toast.success('Véhicule réservé avec succès');
        },
        error: (error: HttpErrorResponse) => {
          toast.error(error.error);
        }
      });
  }
}
