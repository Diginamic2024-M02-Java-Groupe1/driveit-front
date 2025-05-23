import {Component, OnInit} from '@angular/core';
import {TabsModule} from "primeng/tabs";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from '@angular/common';
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
    TabsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    Image
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent implements OnInit {
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
