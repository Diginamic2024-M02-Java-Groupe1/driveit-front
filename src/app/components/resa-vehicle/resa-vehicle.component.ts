import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Vehicle} from "@models/vehicle";
import {ResaVehicleService} from "@services/resa-vehicle.service";
import {ResaVehicle} from "@models/resa-vehicle";

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


  constructor(private fb: FormBuilder,private resaVehicleService: ResaVehicleService) {
    this.filterForm = this.fb.group({
      startDateTime: [!null,Validators.required],
      endDateTime: [!null,Validators.required]
    });
  }

  products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },{
        id: '1100',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },{
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },{
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },{
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },{
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
    ];

  // showCarousel: boolean = false;
  // filterForm: FormGroup;




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
  console.log(this.filterForm.status)
    if (this.filterForm.valid) {
      const { startDateTime, endDateTime} = this.filterForm.value;
      const startDate = startDateTime.toISOString();
      const endDate = endDateTime.toISOString();
      console.log('Start date:', startDate);
      console.log('End date:', endDate);
      this.resaVehicleService.getFilteredVehicles(startDate,endDate).subscribe(
        (data: ResaVehicle[]) => {
          console.log('Je suis dans le onFilter');
          this.filteredVehicles = data;
          console.log('Filtered vehicles:', this.filteredVehicles);
          this.showCarousel = true;
        },
        error => {
          console.error('Error fetching filtered vehicles', error);
        }
      );
    }
  }


}
