import {Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {ResaVehicleService} from "@services/resa-vehicle.service";
import {StatusFilter} from "@models/enums/status-filter.enum";
import {CommonModule, DatePipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmPopup, ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {RouterLink} from "@angular/router";
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  HistoricalFilterComponent
} from "@components/vehicle-reservation-layout/historical-filter/historical-filter.component";
import {AuthService} from "@services/auth.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-vehicle-reservation-history',
  standalone: true,
  imports: [
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    TableModule,
    DatePipe,
    ToastModule,
    ConfirmPopupModule,
    RouterLink,
    NgxSonnerToaster,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricalFilterComponent,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vehicle-reservation-history.component.html',
  styleUrl: './vehicle-reservation-history.component.scss'
})
export class VehicleReservationHistoryComponent implements OnInit {

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  reservations!: ResaVehicle[];
  reservation!: ResaVehicle;
  showReservations: ResaVehicle[] = [];
  reservationsText: string = '';
  statusFilter: StatusFilter = StatusFilter.IN_PROGRESS;
  searchValue: string = '';
  reservationDialog: boolean = false;
  submitted: boolean = false;

  constructor(private resaService: ResaVehicleService,
              private confirmationService: ConfirmationService,
              private authService: AuthService) {
  }

  accept(): void {
    this.confirmPopup.accept();
  }

  reject(): void {
    this.confirmPopup.reject();
  }

  hideDialog() {
    this.reservationDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  onFilterChanged(status: StatusFilter) {
    this.statusFilter = status;
    this.loadReservations();
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchValue = searchTerm;
    this.loadReservations();
  }

  loadReservations(): void {
    const statusChoice = this.statusFilter;
    this.resaService.getMyReservations(statusChoice).subscribe((reservations: ResaVehicle[]) => {
      this.reservations = reservations.filter(reservation =>
        reservation.vehicle.registration.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        reservation.vehicle.model.brand.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        reservation.vehicle.model.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    });
  }

  editReservation(reservation: ResaVehicle): void {
    this.reservation = {
      ...reservation,
      dateTimeStart: new Date(reservation.dateTimeStart),
      dateTimeEnd: new Date(reservation.dateTimeEnd)
    };
    this.reservationDialog = true;
  }

  showReservationsForVehicle(vehicleId: number): void {
    this.resaService.getAllReservationsForThisVehicle(vehicleId).subscribe({
      next: (data: ResaVehicle[]) => {
        this.showReservations = data;
        this.reservationsText = data.map(reservation =>
          `Immatriculation: ${reservation.vehicle.registration}, Date début: ${reservation.dateTimeStart}, Date fin: ${reservation.dateTimeEnd}`
        ).join('\n');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
        toast.error(error.error);
      }
    });
  }

  saveProduct() {
    this.submitted = true;
    if (this.reservation.id !== undefined) {
      const idResa: number = this.reservation.id;

      this.resaService.updateReservationVehicle(idResa, this.reservation).subscribe({
        next: () => {
          this.loadReservations();
          toast.success('Réservation Modifiée');
          this.reservationDialog = false;
        },
        error: (error: HttpErrorResponse) => {

          toast.error(error.error);
          if (this.reservation.vehicle.id !== undefined) {
            this.showReservationsForVehicle(this.reservation.vehicle.id);
          }
        }
      });
    } else {
      console.error('Reservation ID is undefined');
    }

  }


  confirm(event: Event, reserveId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous supprimer cette réservation ?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteReservation(reserveId);
        toast.success('Réservation Supprimée')
        // this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Vous avez accepté', life: 3000 });
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Annuler', detail: 'Vous avez annulé', life: 3000 });
        toast.error('Annuler')
      }
    });
  }

  deleteReservation(id: number): void {
    if (!id) {
      console.error('id is not set');
      return;
    }

    this.resaService.deleteReservationVehicle(id).subscribe({
      next: () => {
        this.loadReservations();
        toast.success('Réservation Supprimée');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
        toast.error(error.error);
      }
    });
  }
}
