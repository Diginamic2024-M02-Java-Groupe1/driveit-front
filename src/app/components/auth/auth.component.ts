import { Component } from '@angular/core';
import {LoginComponent} from "@components/login/login.component";
import {RegisterComponent} from "@components/register/register.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  showLogin = true;

  showLoginForm() {
    this.showLogin = true;
  }

  showRegisterForm() {
    this.showLogin = false;
  }

}
