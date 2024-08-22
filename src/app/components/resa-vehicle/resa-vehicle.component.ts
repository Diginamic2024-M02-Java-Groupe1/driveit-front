import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import {CarouselModule} from 'primeng/carousel';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Vehicle} from "@models/vehicle";
import {ResaVehicleService} from "@services/resa-vehicle.service";
import {ResaVehicle} from "@models/resa-vehicle";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-resa-vehicle',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
  ],
  templateUrl: './resa-vehicle.component.html',
  styleUrl: './resa-vehicle.component.scss'
})
export class ResaVehicleComponent implements OnInit  {

  vehicles:Vehicle[] = [];
  filteredVehicles:ResaVehicle[] = [];
  showCarousel: boolean = false;
  filterForm: FormGroup;

  responsiveOptions: any[] = [];


  constructor(private resaVehicleService: ResaVehicleService) {
    this.filterForm = new FormGroup(
      {
        startDateTime: new FormControl<Date | null>(null, Validators.required),
        endDateTime: new FormControl<Date | null>(null, Validators.required)
      }
    )
  }

ngOnInit() {
  this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  this.filterForm.valueChanges.subscribe(() => {
    this.showCarousel = false;
  });
}


  onFilter() {
    if (this.filterForm.valid) {
      const { startDateTime, endDateTime} = this.filterForm.value;
      const startDate = startDateTime.toISOString();
      const endDate = endDateTime.toISOString();
      this.resaVehicleService.getFilteredVehicles(startDate, endDate).subscribe({
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

  reserveVehicle(reservationVehicle: ResaVehicle) {
    this.resaVehicleService.reserveVehicle(1, reservationVehicle).subscribe({
      next: (data) => {
        console.log('Vehicle reserved', data);
      },
      error: (error) => {
        console.error('Error reserving vehicle', error);
      }
    });
  }

}
