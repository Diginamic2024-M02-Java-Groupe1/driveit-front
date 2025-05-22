import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgStyle} from "@angular/common";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-history-filter',
  standalone: true,
  imports: [
    CalendarModule,
    PaginatorModule,
    PrimeTemplate,
    ReactiveFormsModule,
    NgStyle,
    NgForOf,
    DropdownModule,
    InputTextModule
  ],
  templateUrl: './history-filter.component.html',
  styleUrl: './history-filter.component.scss'
})
export class HistoryFilterComponent implements OnInit{
  @Output() filterChanged = new EventEmitter<StatusFilter>();
  @Output() searchChanged = new EventEmitter<string>();

  filterForm!: FormGroup;
  statusOptions = [
    { value: StatusFilter.ALL, label: 'Tous' },
    { value: StatusFilter.PAST, label: 'Passé' },
    { value: StatusFilter.IN_PROGRESS, label: 'En cours' },
    { value: StatusFilter.INCOMING, label: 'À venir' }
  ];

  constructor() {

  }
  ngOnInit() {
    this.filterForm = new FormGroup({
      status: new FormControl<StatusFilter>(StatusFilter.IN_PROGRESS, Validators.required),
      search: new FormControl<string >('')
    });

      this.filterForm.get('status')?.valueChanges.subscribe((value) => {
      const statusFilter =value.value;
      this.filterChanged.emit(statusFilter);

      this.filterForm.get('search')?.valueChanges.subscribe((value) => {
        this.searchChanged.emit(value);
      });
    });
  }


  onFilter(){
    const statusFilter = this.filterForm.get('status')?.value.value;
      this.filterChanged.emit(statusFilter);
  }

}
