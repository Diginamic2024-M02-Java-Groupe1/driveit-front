import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputOtpModule} from "primeng/inputotp";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {AuthService} from "@services/auth.service";
import {toast} from "ngx-sonner";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    FormsModule,
    InputOtpModule,
    InputTextModule,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  email: string | null = null;
  verifyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.authService.getMail();
    this.verifyForm = this.fb.group(
      {
        code: ['', Validators.required]
      }
    )
  }

  onSubmit() {
    this.authService.verifyAccount(
      this.email,
      this.verifyForm.value.code
    ).subscribe({
      next: (data) => {
        toast.success(data);
        this.router.navigate(['/auth/login']).then();
      },
      error: (error) => {
        toast.error(error);
      },
      complete: () => {
        console.log('Verification process completed');
      }
    });
  }

  resendCode() {
    toast.promise(lastValueFrom(this.authService.resendVerificationCode(this.email)), {
      success: 'Verification code sent successfully',
      error: 'Failed to send verification code'
    });
  }
}
