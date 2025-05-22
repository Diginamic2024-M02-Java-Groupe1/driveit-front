import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { DrawerService } from "@services/drawer.service";
import { ToolbarModule } from "primeng/toolbar";
import { Button } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ImageModule } from "primeng/image";
import { TooltipModule } from "primeng/tooltip";
import { AuthService } from "@services/auth.service";
import { toast } from "ngx-sonner";
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';

interface Link {
  name: string;
  url?: string;
  icon: string;
  click?: () => void;
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
    InputGroup,
    InputGroupAddon,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  links: Link[] | undefined;
  isMobile: boolean = false;
  showMobileSearch: boolean = false;

  constructor(private drawerService: DrawerService, private authService: AuthService, private router: Router) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.links = [
      { "name": "Profile", "url": "/profile", "icon": 'pi pi-user' },
      { "name": "Logout", "icon": 'pi pi-sign-out', click: () => this.logout() },
      { "name": "Menu", "icon": 'pi pi-bars', click: () => this.toggleDrawer() }
    ];
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.showMobileSearch = false;
    }
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  logout(): void {
    this.authService.logout();
  }

  toggleDrawer(): void {
    this.drawerService.setDrawerVisibility(true);
  }

  protected readonly console = console;
}
