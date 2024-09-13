import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CarouselModule} from 'primeng/carousel';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Vehicle} from "@models/vehicle.model";
import {BookingVehicleService} from "@services/booking-vehicle.service";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {CalendarModule} from "primeng/calendar";
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {HttpErrorResponse} from "@angular/common/http";
import {dateRangeValidator} from "@validators/date-range.validator";

@Component({
  selector: 'app-reservations-service-vehicles',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    CarouselModule,
    TagModule,
    ButtonModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    NgxSonnerToaster,
  ],
  templateUrl: './reservations-service-vehicles.component.html',
  styleUrl: './reservations-service-vehicles.component.scss'
})
export class ReservationsServiceVehiclesComponent implements OnInit {

  filteredVehicles: ResaVehicle[] = [];
  showCarousel: boolean = false;
  filterForm: FormGroup;
  currentDateNumb: number = 0;
  currentDate!: Date;

  constructor(private resaVehicleService: BookingVehicleService) {
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
    this.currentDateNumb = new Date().getDate();
    this.currentDate = new Date();
  }

  onFilter() {
    if (this.filterForm.valid) {
      const {startDateTime, endDateTime} = this.filterForm.value;
      const startDate = startDateTime.toISOString();
      const endDate = endDateTime.toISOString();
      this.resaVehicleService.getAvailableVehicles(startDate, endDate).subscribe({
        next: (data: ResaVehicle[]) => {
          this.filteredVehicles = data;
          this.showCarousel = true;
        },
        error: (error) => {
          console.error('Error fetching filtered vehicles', error);
        }
      });
    }
  }

  reserveVehicle(vehicle: Vehicle) {
    const reservationData: ResaVehicle = {
      dateTimeStart: this.filterForm.get('startDateTime')?.value.toISOString(),
      dateTimeEnd: this.filterForm.get('endDateTime')?.value.toISOString(),
      vehicle: vehicle
    };
    this.resaVehicleService.reserveVehicle(reservationData).subscribe({
      next: (data) => {
        this.onFilter();
        toast.success('Véhicule réservé avec succès');
      },
      error: (error: HttpErrorResponse) => {
        toast.error(error.error);
      }
    });
  }

}
