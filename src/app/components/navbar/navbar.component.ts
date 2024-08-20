import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {heroArrowRightOnRectangle, heroBars3, heroUser} from "@ng-icons/heroicons/outline";
import {MatIconButton} from "@angular/material/button";
import {DrawerService} from "@services/drawer.service";

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
    NgIconComponent,
    MatIconButton
  ],
  providers: [provideIcons({heroUser,heroArrowRightOnRectangle,heroBars3})],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  links: Link[] = [
    {"name": "Profile", "url": "/profile", "icon": heroUser},
    {"name": "Logout", "url": "/logout", "icon": heroArrowRightOnRectangle},
  ];

  constructor(private drawerService: DrawerService) {}

  toggleMenu() {
    this.drawerService.toggleDrawer();
  }
}
