import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {heroBars3, heroXMark} from "@ng-icons/heroicons/outline";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DrawerService} from "@services/drawer.service";
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";
import {SidebarModule} from "primeng/sidebar";
import {MenubarModule} from "primeng/menubar";
import {Ripple} from "primeng/ripple";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, PanelMenuModule, RouterLink, RouterLinkActive, SidebarModule, MenubarModule, Ripple, NgClass],
  providers: [provideIcons({heroBars3, heroXMark})],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  links: MenuItem[] | undefined;
  sidebarVisible = false;
  private subscription: Subscription | undefined;

  constructor(private drawerService: DrawerService) {
  }

  ngOnInit() {
    this.links = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-cog',
        items: [
          {label: 'Véhicules de service', icon: 'pi pi-fw pi-car', routerLink: '/vehicules', routerLinkActiveOptions: {exact: true}},
        ]
      },
      {
        label: 'Covoiturage',
        icon: 'pi pi-fw pi-users',
        items: [
          {label: 'Reserver Vehicule', icon: 'pi pi-fw pi-plus', routerLink: '/reserver-vehicule', routerLinkActiveOptions: {exact: true}},
          {label: 'Ajouter un véhicule de service', icon: 'pi pi-fw pi-plus', routerLink: '/ajoutVehicule', routerLinkActiveOptions: {exact: true}},
        ]
      }
    ];

    this.subscription = this.drawerService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
