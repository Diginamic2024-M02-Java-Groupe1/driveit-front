import {Component, Input, OnInit} from '@angular/core';
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-vehicle-reservation-item',
  standalone: true,
  imports: [
    RatingModule,
    TagModule,
    DatePipe
  ],
  templateUrl: './vehicle-reservation-item.component.html',
  styleUrl: './vehicle-reservation-item.component.scss'
})
export class VehicleReservationItemComponent {

  @Input() resaVehicle!: ResaVehicle;


}
