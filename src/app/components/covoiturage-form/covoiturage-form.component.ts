import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Vehicle} from "@models/vehicle.model";
import {VehicleService} from "@services/vehicle/vehicle.service";
import { InputMaskModule } from 'primeng/inputmask';
import {CalendarModule} from "primeng/calendar";
import {AccordionModule} from "primeng/accordion";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import CarpoolingData from "@components/covoiturage-form/CarpoolingData";
import {CarpoolingService} from "@services/carpooling.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {LocalCalendarService} from "@services/local-calendar.service";
import {toast} from "ngx-sonner";
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-covoiturage-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
  styleUrls: ['./covoiturage-form.component.scss'],
})
export class CovoiturageFormComponent implements OnInit {

  vehicles: Vehicle[] = [];
  groupedVehicles: any[] = [];
  carpoolingForm: FormGroup = new FormGroup({
    departureDateTime: new FormControl('', [Validators.required]),
    arrivalDateTime: new FormControl('', [Validators.required]),
    departureAddress: new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      street: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00C0-\u017F ]*$')]),
      type: new FormControl('rue', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    }),
    arrivalAddress: new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      street: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00C0-\u017F ]*$')]),
      type: new FormControl('avenue', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    }),
    vehicle: new FormControl('', [Validators.required]),
  });

  constructor(private vehicleService: VehicleService, private carpoolingService: CarpoolingService, private messageService: MessageService,
              private readonly localCalendarService: LocalCalendarService) {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.groupedVehicles = [
        {
          label: 'Véhicules de service',
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
          label: 'Véhicules personnels',
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
    this.localCalendarService.setFrenchLocale();
  }


  submit(): void {
    const carpooling = this.carpoolingForm.value as CarpoolingData;
    this.carpoolingService.insertCarpooling(carpooling).subscribe({
      next: (response) => {
        toast.success('Covoiturage créé avec succès')
        this.carpoolingForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        toast.error(error.error);
      }
    });
  }

  onCancel() {
    console.log('canceled');
  }

  getErrorClass(controlName: string): any {
    return {
      'ring-2 ring-red-500': this.carpoolingForm?.get(controlName)?.invalid && this.carpoolingForm?.get(controlName)?.touched,
      '' : this.carpoolingForm?.get(controlName)?.valid
    }
  }







}
