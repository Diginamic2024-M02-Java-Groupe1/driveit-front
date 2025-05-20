import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {toast} from "ngx-sonner";
import {Router} from "@angular/router";
import {PasswordModule} from "primeng/password";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {HttpErrorResponse} from "@angular/common/http";
import {matchPasswordValidator} from "@validators/match-password.validator";
import {NgClass} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    CheckboxModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;

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
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        termsConditions: [false, Validators.requiredTrue]
      },
      { validators: matchPasswordValidator() }
    );
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get termsConditions() {
    return this.registerForm.get('termsConditions');
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (controlName === 'termsConditions' && control?.hasError('required')) {
      return 'You must accept the terms and conditions';
    }
    if(control?.hasError('required')) {
      return 'This field is required';
    }
    if(control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if(control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if(control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength} characters`;
    }
    if (controlName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      toast.error('Form is invalid');
      return;
    }

    this.authService.register(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: () => {
        this.authService.setMail(this.registerForm.value.email);
        toast.success('Registration successful');
        this.router.navigate(['/verify']).then();
      },
      error: (errorResponse: HttpErrorResponse) => {
        toast.error(errorResponse.error);
      },
    });
  }
}
