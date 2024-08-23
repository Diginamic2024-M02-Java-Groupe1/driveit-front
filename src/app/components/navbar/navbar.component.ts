import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DrawerService} from "@services/drawer.service";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ImageModule} from "primeng/image";
import {TooltipModule} from "primeng/tooltip";

interface Link {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ToolbarModule,
    Button,
    InputTextModule,
    ImageModule,
    TooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  links: Link[] | undefined;

  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {
    this.links = [
      { "name": "Profile", "url": "/profile", "icon": 'pi pi-user' },
      { "name": "Logout", "url": "/logout", "icon": 'pi pi-sign-out' },
    ];
  }

  openMenu() {
    this.drawerService.setDrawerVisibility(true);
  }
}
