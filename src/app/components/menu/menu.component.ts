import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {heroBars3, heroXMark} from "@ng-icons/heroicons/outline";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DrawerService} from "@services/drawer.service";
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, PanelMenuModule, RouterLink, RouterLinkActive],
  providers: [provideIcons({heroBars3, heroXMark})],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit, OnInit {
  // @ViewChild('drawer') drawer!: MatDrawer;
  links: MenuItem[] | undefined;

  // links = [
  //   {name: 'Home', url: '/'},
  //   {name: 'Ajouter un véhicule de service', url: '/ajoutVehicule'},
  //   {name: 'Reserver Vehicule', url: '/reserver-vehicule'},
  // ];

  constructor(private drawerService: DrawerService) {
  }

  ngOnInit() {
    this.links = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-cog',
        items: [
          {label: 'Véhicules de service', icon: 'pi pi-fw pi-plus', routerLink: '/vehicules', routerLinkActiveOptions: {exact: true}},
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
    ]
  }

  ngAfterViewInit(): void {
    // this.drawerService.setDrawer(this.drawer);
  }
}
