import {Component} from '@angular/core';
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {NavbarComponent} from "@components/navbar/navbar.component";
import {MenuComponent} from "@components/menu/menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSonnerToaster, NavbarComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'driveit';
  protected readonly toast = toast;
}
