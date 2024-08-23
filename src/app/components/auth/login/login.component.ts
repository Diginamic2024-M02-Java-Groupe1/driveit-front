// src/app/components/auth/login/login.component.ts
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.email?.value, this.password?.value).subscribe((response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.authService.saveUserCredentials(this.email?.value, this.password?.value);
          console.log('Login successful');
          this.router.navigate(['']);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength} characters`;
    }
    return '';
  }

  ngOnInit(): void {
    const {email, password} = this.authService.getUserCredentials();
    this.loginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    });
  }
}
