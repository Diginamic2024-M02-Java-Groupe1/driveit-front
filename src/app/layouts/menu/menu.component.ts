import { Component, OnDestroy, OnInit } from '@angular/core';
import { provideIcons } from "@ng-icons/core";
import { heroBars3, heroXMark } from "@ng-icons/heroicons/outline";
import { DrawerService } from "@services/drawer.service";
import { PanelMenuModule } from "primeng/panelmenu";
import { MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
import { DrawerModule } from "primeng/drawer";
import { MenubarModule } from "primeng/menubar";
import { AuthService } from "@services/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, DrawerModule, MenubarModule, ButtonModule],
  providers: [provideIcons({heroBars3, heroXMark})],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  links: MenuItem[] | undefined;
  sidebarVisible = false;
  private subscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private readonly drawerService: DrawerService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.createMenuItems();

    this.subscription = this.drawerService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });

    // Prevent navigation from closing the drawer
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Keep drawer open when navigating
        if (this.sidebarVisible) {
          setTimeout(() => {
            this.drawerService.setDrawerVisibility(true);
          }, 0);
        }
      });
  }

  private createMenuItems() {
    this.links = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Véhicules de service',
            icon: 'pi pi-fw pi-car',
            command: () => this.navigateTo('/vehicles/service')
          },
        ]
      },
      {
        label: 'Covoiturage',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Réserver un véhicule',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateTo('/vehicles/service/booking')
          },
          {
            label: 'Ajouter un véhicule de service',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateTo('/vehicles/service/add')
          },
          {
            label: 'Historique de reservation',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateTo('/vehicles/service/booking/history')
          },
          {
            label:'Mes Trajets',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateTo('/trips/passenger')
          },
        ]
      }
    ];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    // We're keeping the drawer open - navigation event will trigger
  }

  closeDrawer() {
    this.drawerService.setDrawerVisibility(false);
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    if(this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
