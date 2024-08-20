import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  ],
  templateUrl: './resa-vehicle.component.html',
  styleUrl: './resa-vehicle.component.scss'
})
export class ResaVehicleComponent implements OnInit  {

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

  filteredProducts = this.products;
  showCarousel: boolean = false;
  filterForm: FormGroup;

  responsiveOptions: any[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: ['',Validators.required],
      startHeure: ['',Validators.required],
      endDate: ['',Validators.required],
      endHeure: ['',Validators.required]
    });
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
      const {startDate, startHeure, endDate, endHeure} = this.filterForm.value;
      this.filteredProducts = this.products.filter(product => {
        // Add your filtering logic here
        return true; // Replace with actual condition
      });
      this.showCarousel = true;
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'danger';
      default:
        return 'info';
    }
  }
}
