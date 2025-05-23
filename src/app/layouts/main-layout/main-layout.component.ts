import {Component, ViewChild} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgxSonnerToaster} from "ngx-sonner";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layout',
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
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event){
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = true;

}
