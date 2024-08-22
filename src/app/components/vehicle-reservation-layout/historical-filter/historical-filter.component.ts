import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgStyle} from "@angular/common";
import {VehicleReservationHistoryService} from "@services/vehicle-reservation-history.service";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {TreeSelectModule} from "primeng/treeselect";

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
    TreeSelectModule
  ],
  templateUrl: './historical-filter.component.html',
  styleUrl: './historical-filter.component.scss'
})
export class HistoricalFilterComponent implements OnInit{
  @Output() filterChanged = new EventEmitter<StatusFilter>();

  filterForm!: FormGroup;
  statusOptions = [
    { value: StatusFilter.PAST, label: 'Passé' },
    { value: StatusFilter.IN_PROGRESS, label: 'En cours' },
    { value: StatusFilter.INCOMING, label: 'À venir' }
  ];

  constructor(private vehicleResaHistory:VehicleReservationHistoryService) {

  }
  ngOnInit() {
    this.filterForm = new FormGroup({
      startDateTime: new FormControl<Date | null>(null, Validators.required),
      status: new FormControl<StatusFilter | null>(null, Validators.required)
    });
  }

  onFilter(){

    // if(this.filterForm.valid){
    const statusFilter = this.filterForm.get('status')?.value.value;
      this.filterChanged.emit(statusFilter);
    // }
  }

}
