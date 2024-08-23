import {Component, ViewChild} from '@angular/core';
import {MenuComponent} from "@components/menu/menu.component";
import {NavbarComponent} from "@components/navbar/navbar.component";
import {NgxSonnerToaster} from "ngx-sonner";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    MenuComponent,
    NavbarComponent,
    NgxSonnerToaster,
    RouterOutlet,
    AvatarModule
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event){
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = true;

}
