import {Component, ViewEncapsulation} from '@angular/core';
import {LoginComponent} from "@components/auth/login/login.component";
import {RegisterComponent} from "@components/auth/register/register.component";
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
  styleUrl: './auth.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent {


}
