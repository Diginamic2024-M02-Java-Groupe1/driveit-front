import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {NavbarComponent} from "@components/navbar/navbar.component";
import {MenuComponent} from "@components/menu/menu.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "@services/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster, NavbarComponent, MenuComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'driveit';
  protected readonly toast = toast;

  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler() {
    this.authService.logout();
  }
}
