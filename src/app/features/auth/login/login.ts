import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  errorMessage = '';
  loginForm;
  

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required]
  });
   }

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
          const user = this.auth.getUser();
         if (user.role === 'ROLE_USER') {
      this.router.navigate(['/user/dashboard']);
    } else if (user.role === 'ROLE_AGENT') {
      this.router.navigate(['/agent/dashboard']);
    } else if (user.role === 'ROLE_MANAGER') {
      this.router.navigate(['/manager/dashboard']);
    }
        this.cdr.detectChanges();
      },

      error: err => this.errorMessage = err.error?.message || 'Login failed'
    });
  }
}
