import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgStyle} from "@angular/common";
import {VehicleReservationHistoryService} from "@services/vehicle-reservation-history.service";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-historical-filter',
  standalone: true,
  imports: [
    CalendarModule,
    PaginatorModule,
    PrimeTemplate,
    ReactiveFormsModule,
    NgStyle,
    NgForOf,
    DropdownModule
  ],
  templateUrl: './historical-filter.component.html',
  styleUrl: './historical-filter.component.scss'
})
export class HistoricalFilterComponent implements OnInit{
  @Output() filterChanged = new EventEmitter<StatusFilter>();

  filterForm!: FormGroup;
  statusOptions = [
    { value: StatusFilter.ALL, label: 'Tous' },
    { value: StatusFilter.PAST, label: 'Passé' },
    { value: StatusFilter.IN_PROGRESS, label: 'En cours' },
    { value: StatusFilter.INCOMING, label: 'À venir' }
  ];

  constructor(private vehicleResaHistory:VehicleReservationHistoryService) {

  }
  ngOnInit() {
    this.filterForm = new FormGroup({
      status: new FormControl<StatusFilter>(StatusFilter.IN_PROGRESS, Validators.required)
    });
    this.filterForm.get('status')?.valueChanges.subscribe((value) => {
      const statusFilter =value.value;
      this.filterChanged.emit(statusFilter);

    });
  }

  onFilter(){

    // if(this.filterForm.valid){
    const statusFilter = this.filterForm.get('status')?.value.value;
      this.filterChanged.emit(statusFilter);
    // }
  }

}
