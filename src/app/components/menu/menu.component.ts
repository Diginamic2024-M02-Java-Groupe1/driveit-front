import {Component, OnDestroy, OnInit} from '@angular/core';
import {provideIcons} from "@ng-icons/core";
import {heroBars3, heroXMark} from "@ng-icons/heroicons/outline";
import {DrawerService} from "@services/drawer.service";
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";
import {SidebarModule} from "primeng/sidebar";
import {MenubarModule} from "primeng/menubar";
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, SidebarModule, MenubarModule],
  providers: [provideIcons({heroBars3, heroXMark})],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  links: MenuItem[] | undefined;
  sidebarVisible = false;
  private subscription: Subscription | undefined;

  constructor(private readonly drawerService: DrawerService, private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.links = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-cog',
        items: [
          {label: 'Véhicules de service', icon: 'pi pi-fw pi-car', routerLink: '/vehicles/list', routerLinkActiveOptions: {exact: true}},
        ]
      },
      {
        label: 'Covoiturage',
        icon: 'pi pi-fw pi-users',
        items: [
          {label: 'Réserver un véhicule', icon: 'pi pi-fw pi-plus', routerLink: '/vehicles/service/booking', routerLinkActiveOptions: {exact: true}},
          {label: 'Ajouter un véhicule de service', icon: 'pi pi-fw pi-plus', routerLink: '/vehicles/add', routerLinkActiveOptions: {exact: true}},
          {label: 'Historique de reservation', icon: 'pi pi-fw pi-plus',routerLink: '/vehicles/service/booking/history', routerLinkActiveOptions: {exact: true}},
          {label:'Mes Trajets', icon: 'pi pi-fw pi-plus', routerLink: '/passenger-trips', routerLinkActiveOptions: {exact: true}},
          {label:'Mes Trajets', icon: 'pi pi-fw pi-plus', routerLink: '/driver-trips', routerLinkActiveOptions: {exact: true}},
          {label:'Covoiturage', icon: 'pi pi-fw pi-plus', routerLink: '/passenger-reserve-trip', routerLinkActiveOptions: {exact: true}},
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
