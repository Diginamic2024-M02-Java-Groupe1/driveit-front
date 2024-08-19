import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIconComponent, provideIcons} from "@ng-icons/core"
import {heroArrowRightOnRectangle, heroUser} from "@ng-icons/heroicons/outline";
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
    NgIconComponent
  ],
  providers: [provideIcons({heroUser,heroArrowRightOnRectangle})],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  links: Link[] = [
    {"name": "Profile", "url": "/profile", "icon": heroUser},
    {"name": "Logout", "url": "/logout", "icon": heroArrowRightOnRectangle},
  ]
}
