import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {AjoutVehicleServiceComponent} from "@components/ajout-vehicle-service/modal/ajout-vehicle-service.component";
import {NavbarComponent} from "@components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster, NavbarComponent, AjoutVehicleServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'driveit';
  protected readonly toast = toast;
}
