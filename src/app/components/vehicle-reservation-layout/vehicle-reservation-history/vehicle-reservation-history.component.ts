import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  VehicleReservationItemComponent
} from "@components/vehicle-reservation-layout/vehicle-reservation-item/vehicle-reservation-item.component";
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {ResaVehicleService} from "@services/resa-vehicle.service";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {DatePipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmPopup, ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-vehicle-reservation-history',
  standalone: true,
  imports: [
    VehicleReservationItemComponent,
    TagModule,
    RatingModule,
    Button,
    TableModule,
    DatePipe,
    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vehicle-reservation-history.component.html',
  styleUrl: './vehicle-reservation-history.component.scss'
})
export class VehicleReservationHistoryComponent implements OnInit {

  @Input() idCollabo!: number;
  @Input() statusChoice!: StatusFilter;
  reservations!: ResaVehicle[];
  @ViewChild(ConfirmPopup)confirmPopup!: ConfirmPopup;

  constructor(private resaService: ResaVehicleService,private confirmationService:ConfirmationService,private messageService: MessageService) {
  }

  accept(): void {
    this.confirmPopup.accept();
  }

  reject(): void {
    this.confirmPopup.reject();
  }

  ngOnInit(): void {
   this.loadReservations();
  }

  loadReservations(): void {
    const idCollabo = 1;
    const statusChoice = this.statusChoice;
    console.log('statusChoice', statusChoice);
    this.resaService.getReservations(idCollabo, statusChoice).subscribe((reservations: ResaVehicle[]) => {
      this.reservations = reservations;
    });
  }

  confirm(event: Event, reserveId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous supprimer cette réservation ?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteReservation(reserveId);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  deleteReservation(id: number): void {
    this.resaService.deleteReservationVehicle(id).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error deleting reservation', error);
      }
    });
  }
}
