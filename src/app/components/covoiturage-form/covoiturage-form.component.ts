import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Vehicle} from "@models/vehicle.model";
import {VehicleService} from "@services/vehicle/vehicle.service";
import {StatusVehicle} from "@models/enums/status-vehicle.enum";

import { InputMaskModule } from 'primeng/inputmask';
import {CalendarModule} from "primeng/calendar";
import {AccordionModule} from "primeng/accordion";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Carpooling} from "@models/carpooling.model";
import CarpoolingData from "@components/covoiturage-form/CarpoolingData";
import {CarpoolingService} from "@services/carpooling.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
@Component({
  selector: 'app-covoiturage-form',
  standalone: true,
  imports: [
    OwlDateTimeModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    MatCard,
    MatRadioGroup,
    MatRadioButton,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    MatIcon,
    InputMaskModule,
    CalendarModule,
    AccordionModule,
    ListboxModule,
    DropdownModule,
    FormsModule,
    NgClass,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './covoiturage-form.component.html',
})
export class CovoiturageFormComponent implements OnInit {

  vehicles: Vehicle[] = [];
  groupedVehicles: any[] = [];
  carpoolingForm: FormGroup = new FormGroup({
    departureDateTime: new FormControl('', [Validators.required]),
    arrivalDateTime: new FormControl('', [Validators.required]),
    departureAddress: new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      street: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      type: new FormControl('rue', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    }),
    arrivalAddress: new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      street: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      type: new FormControl('avenue', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    }),
    vehicle: new FormControl('', [Validators.required]),
  });

  constructor(private vehicleService: VehicleService, private carpoolingService: CarpoolingService, private messageService: MessageService) {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.groupedVehicles = [
        {
          label: 'Véhicules personnels',
          items: this.vehicles
            .filter((vehicle) => vehicle.service)
            .map((vehicle) => {
            return {
              label: `${vehicle.model.brand.name} - ${vehicle.model.name} - ${vehicle.numberOfSeats} places (${vehicle.category.name}) | ${vehicle.registration}`,
              value: vehicle.id
            }
          })
        },
        {
          label: 'Véhicules de service',
          items: this.vehicles
            .filter((vehicle) => !vehicle.service)
            .map((vehicle) => {
            return {
              label: vehicle.model.brand.name,
              value: vehicle.id
            }
          })
        }
      ];
    });
  }

  ngOnInit(): void {
  }


  submit(): void {
    const carpooling = this.carpoolingForm.value as CarpoolingData;
    this.carpoolingService.insertCarpooling(carpooling).subscribe({
      next: (response) => {
        this.messageService.add({severity:'success', summary:'Création de covoiturage', detail:'Covoiturage créé avec succès'});
      },
      error: (error) => {
        console.error(error.error?.errors);
        const errors = error.error?.errors;
        let message = errors.join(',')
        message = message.substring(0, message.length) + '.'
        this.messageService.add({severity:'error', summary:'Création de covoiturage', detail: message});
      }
    });
  }

  getErrorClass(controlName: string): any {
    return {
      'ring-2 ring-red-500': this.carpoolingForm?.get(controlName)?.invalid && this.carpoolingForm?.get(controlName)?.touched,
      '' : this.carpoolingForm?.get(controlName)?.valid
    }
  }







}
