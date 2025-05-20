import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {DrawerService} from "@services/drawer.service";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ImageModule} from "primeng/image";
import {TooltipModule} from "primeng/tooltip";
import {AuthService} from "@services/auth.service";
import {toast} from "ngx-sonner";

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  links: Link[] | undefined;

  constructor(private drawerService: DrawerService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.links = [
      { "name": "Profile", "url": "/profile", "icon": 'pi pi-user' },
      { "name": "Logout", "icon": 'pi pi-sign-out', click: () => this.logout() },
      { "name": "Menu", "icon": 'pi pi-bars', click: () => this.drawerService.setDrawerVisibility(true) }
    ];
  }

  logout(): void {
    this.authService.logout().subscribe((response: string) => {
      sessionStorage.removeItem('token');
      toast.success(response);
      this.router.navigate(['auth/login']).catch(console.error);
    });
  }
}
