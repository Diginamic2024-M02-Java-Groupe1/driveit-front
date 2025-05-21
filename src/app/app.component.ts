import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxSonnerToaster} from "ngx-sonner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {MessageService} from "primeng/api";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogModalService} from "@services/dialog-modal/dialog-modal.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster, ReactiveFormsModule, FormsModule, CommonModule, DropdownModule],
  providers: [MessageService, DialogService, DialogModalService, DynamicDialogRef, DynamicDialogConfig],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'driveit';

  constructor() {}
}
