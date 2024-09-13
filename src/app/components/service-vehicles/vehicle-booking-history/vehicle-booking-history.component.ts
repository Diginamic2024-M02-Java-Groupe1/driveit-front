import {Component, OnInit, ViewChild} from '@angular/core';
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {BookingVehicleService} from "@services/booking-vehicle.service";
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
  HistoryFilterComponent
} from "@components/service-vehicles/history-filter/history-filter.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-vehicle-booking-history',
  standalone: true,
  imports: [
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    TableModule,
    ToastModule,
    ConfirmPopupModule,
    RouterLink,
    NgxSonnerToaster,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HistoryFilterComponent,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    HistoryFilterComponent,

  ],
  providers: [ConfirmationService, MessageService,DatePipe],
  templateUrl: './vehicle-booking-history.component.html',
  styleUrl: './vehicle-booking-history.component.scss'
})
export class VehicleBookingHistoryComponent implements OnInit {

  /** all reservations **/
  reservations!: ResaVehicle[];

  /** used to edit reservation **/
  reservationToEdit!: ResaVehicle;
  showReservations: ResaVehicle[] = [];
  reservationsText: string = '';

  /** used to filter the reservations **/
  statusFilter: StatusFilter = StatusFilter.IN_PROGRESS;
  searchValue: string = '';

  /** used to confirm the deletion of a reservation **/
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  isDialogEdit: boolean = false;
  submitted: boolean = false;

  currentDate: Date = new Date();


  constructor(private resaService: BookingVehicleService,
              private confirmationService: ConfirmationService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  /**
   * Load all reservations
   * Filter by status and search value if needed
   */
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

  /**
   * Edit a reservation and open the dialog
   * @param reservation : ResaVehicle : reservation to edit
   */
  editReservation(reservation: ResaVehicle): void {
    this.reservationToEdit = {
      ...reservation,
      dateTimeStart: new Date(reservation.dateTimeStart),
      dateTimeEnd: new Date(reservation.dateTimeEnd)
    };
    this.isDialogEdit = true;
  }

  /**
   * Update the reservation in the database and reload the reservations list if successful or show an error message
   * If the vehicle has already a reservation for this date range, show the reservations for this vehicle
   */
  confirmDialogEdit() {
    this.submitted = true;
    if (this.reservationToEdit.dateTimeEnd <= this.reservationToEdit.dateTimeStart) {
      toast.error('La date de fin doit être postérieure à la date de début.');
      return;
    }
    if (this.reservationToEdit.id !== undefined) {
      const idResa: number = this.reservationToEdit.id;
      this.resaService.updateReservationVehicle(idResa, this.reservationToEdit).subscribe({
        next: () => {
          this.loadReservations();
          toast.success('Réservation Modifiée');
          this.isDialogEdit = false;
        },
        error: (error: HttpErrorResponse) => {
          toast.error(error.error);
          if (this.reservationToEdit.vehicle.id !== undefined) {
            this.showReservationsForVehicle(this.reservationToEdit.vehicle.id);
          }
        }
      });
    } else {
      console.error('Reservation ID is undefined');
    }
  }

  /**
   * Show all reservations if the user wants to modify a reservation and there is already booked for this vehicle
   * @param vehicleId : number : id of the vehicle
   */
  showReservationsForVehicle(vehicleId: number): void {
    this.resaService.getAllReservationsForThisVehicle(vehicleId).subscribe({
      next: (data: ResaVehicle[]) => {
        this.showReservations = data;
        this.reservationsText = data.map(reservation =>
          `Immatriculation: ${reservation.vehicle.registration}, Date début: ${this.formatDate(reservation.dateTimeStart.toString())}, Date fin: ${reservation.dateTimeEnd}`
        ).join('\n');
      },
      error: (error: HttpErrorResponse) => {
        toast.error(error.error);
      }
    });
  }

  /**
   * Delete a reservation
   * @param event : Event
   * @param reserveId : number : id of the reservation to delete
   */
  confirmPopUpDelete(event: Event, reserveId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous supprimer cette réservation ?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteReservation(reserveId);
        toast.success('Réservation Supprimée')
      },
      reject: () => {
        toast.error('Annuler')
      }
    });
  }

  /** Delete a reservation and reload the reservations list if successful or show an error message
   * @param id : number : id of the reservation to delete
   */
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
        toast.error(error.error);
      }
    });
  }

  /** Format a date to display it
   * @param date : string : date to format
   * @returns string : formatted date
   */
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yy à HH\'H\'mm') ?? '';
  }

  /**
   * Compare two dates
   * @param date1 : string : first date to compare
   * @param date2 : Date : second date to compare
   * @returns boolean : true if date1 is after date2
   */
  compareDates(date1: string, date2: Date): boolean {
    return new Date(date1) > date2;
  }

  /**
   * Filter the reservations by status
   * @param status : StatusFilter : status to filter
   */
  onFilterChanged(status: StatusFilter) {
    this.statusFilter = status;
    this.loadReservations();
  }

  /** Filter the reservations by search term
   * @param searchTerm
   */
  onSearchTermChanged(searchTerm: string) {
    this.searchValue = searchTerm;
    this.loadReservations();
  }

  /** Close the dialog */
  hideDialog() {
    this.isDialogEdit = false;
    this.submitted = false;
  }

}
