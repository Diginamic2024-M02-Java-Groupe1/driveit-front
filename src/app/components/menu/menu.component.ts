import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {heroBars3, heroXMark} from "@ng-icons/heroicons/outline";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DrawerService} from "@services/drawer.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({heroBars3, heroXMark})],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit{
  @ViewChild('drawer') drawer!: MatDrawer;

  links = [
    {name: 'Home', url: '/'},
    {name: 'Auth', url: '/auth'},
  ];

  constructor(private drawerService: DrawerService) {
  }

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }
}
