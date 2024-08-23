import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginComponent} from "@components/auth/login/login.component";
import {RegisterComponent} from "@components/auth/register/register.component";
import {TabViewModule} from "primeng/tabview";
import {MenubarModule} from "primeng/menubar";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    TabViewModule,
    MenubarModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Connexion',
        routerLink: 'login'
      },
      {
        label: 'Inscription',
        routerLink: 'register',
        routerLinkActiveOptions: {exact: true},
        routerLinkActive: 'active-link'
      }
    ];
  }
}
