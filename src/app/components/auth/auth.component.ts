import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "@components/auth/login/login.component";
import { RegisterComponent } from "@components/auth/register/register.component";
import { TabsModule } from "primeng/tabs";
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import {Image} from 'primeng/image';

interface Tab {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    TabsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    Image
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  tabs: Tab[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tabs = [
      {
        label: 'Connexion',
        icon: 'pi pi-user',
        route: 'login'
      },
      {
        label: 'Inscription',
        icon: 'pi pi-user-plus',
        route: 'register'
      }
    ];
  }

  getActiveRoute(): string {
    // Get the last segment of the URL
    const urlSegments = this.router.url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    // Return the active route or default to 'login'
    return this.tabs.some(tab => tab.route === lastSegment) ? lastSegment : 'login';
  }
}
