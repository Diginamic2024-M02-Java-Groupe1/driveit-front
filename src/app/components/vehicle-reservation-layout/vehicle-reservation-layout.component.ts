import {Component, OnInit} from '@angular/core';
import {
  HistoricalFilterComponent
} from "@components/vehicle-reservation-layout/historical-filter/historical-filter.component";
import {
  VehicleReservationHistoryComponent
} from "@components/vehicle-reservation-layout/vehicle-reservation-history/vehicle-reservation-history.component";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {AuthService} from "@services/auth.service";


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
export class VehicleReservationLayoutComponent implements OnInit {

  statusFilter: StatusFilter = StatusFilter.IN_PROGRESS;
  idCollabo!: number;

  constructor(private authService: AuthService) {
  }

  onFilterChanged(status: StatusFilter) {
    this.statusFilter = status;
  }

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((user: { id: number; }) => {
        this.idCollabo = user.id ;
      });
    }

}
