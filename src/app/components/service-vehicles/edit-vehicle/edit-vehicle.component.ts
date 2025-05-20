import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {
  AjoutVehiculeComponent
} from "@components/service-vehicles/ajout-vehicule/ajout-vehicule/ajout-vehicule.component";

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [
    DialogModule,
    Button,
    AjoutVehiculeComponent
  ],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss'
})
export class EditVehicleComponent {

  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  hideDialog() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  onSave() {
      // Save logic here
      this.hideDialog()
  }

}
