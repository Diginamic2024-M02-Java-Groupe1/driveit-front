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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vehicle-reservation-history.component.html',
  styleUrl: './vehicle-reservation-history.component.scss'
})
export class VehicleReservationHistoryComponent implements OnInit {

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  reservations!: ResaVehicle[];
  statusFilter: StatusFilter = StatusFilter.IN_PROGRESS;

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

  ngOnInit(): void {
    this.loadReservations();
  }

  onFilterChanged(status: StatusFilter) {
    this.statusFilter = status;
    this.loadReservations();
  }


  loadReservations(): void {
    const statusChoice = this.statusFilter;
    this.resaService.getReservations(statusChoice).subscribe((reservations: ResaVehicle[]) => {
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
      },
      error: (error) => {
        console.error('Erreur pour la suppression de la réservation', error);
      }
    });
  }
}
