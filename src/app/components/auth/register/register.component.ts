import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {toast} from "ngx-sonner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }
    )
  }

  onSubmit() {
    this.authService.register(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: () => {
        this.authService.setMail(this.registerForm.value.email);
        toast.success('Registration successful');
        this.router.navigate(['/verify']);
      },
      error: (error) => {
        toast.error(error);
      },
      complete: () => {
        console.log('Registration process completed');
      }
    });
  }
}
