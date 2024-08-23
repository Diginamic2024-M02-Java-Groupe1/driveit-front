import { Component } from '@angular/core';
import {HistoricalFilterComponent} from "@components/vehicle-reservation-layout/historical-filter/historical-filter.component";
import {
  VehicleReservationHistoryComponent
} from "@components/vehicle-reservation-layout/vehicle-reservation-history/vehicle-reservation-history.component";
import {StatusFilter} from "@models/enums/status-filter.enum";

@Component({
  selector: 'app-vehicle-reservation-layout',
  standalone: true,
  imports: [
    HistoricalFilterComponent,
    VehicleReservationHistoryComponent
  ],
  templateUrl: './vehicle-reservation-layout.component.html',
  styleUrl: './vehicle-reservation-layout.component.scss'
})
export class VehicleReservationLayoutComponent {

    statusFilter:StatusFilter = StatusFilter.ALL;

    onFilterChanged(status: StatusFilter){
      this.statusFilter = status;
    }
}
