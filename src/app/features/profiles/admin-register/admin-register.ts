import { Component,ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../core/services/admin.services';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-register.html',
  styleUrl: './admin-register.css',
})
export class AdminRegister {

  
  form = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  loading = false;
  message = '';
  error = '';

  constructor(private adminService: AdminService,
    private cdr:ChangeDetectorRef,
    private router:Router
  ) {}

  submit() {
    this.message = '';
    this.error = '';

    if (!this.form.role) {
      this.error = 'Role is required';
      return;
    }

    this.loading = true;

    this.adminService.registerUser(this.form)
      .subscribe({
        next: (res: any) => {
          this.message = res;
          this.loading = false;
          this.cdr.detectChanges();
          this.resetForm();
          this.router.navigate(['/adminViewProfiles'])
        },
        error: (err) => {
          this.error = err.error || 'Registration failed';
          
           const parsed = JSON.parse(err.error);
          this.error = parsed.message || 'Registration failed';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  resetForm() {
    this.form = {
      name: '',
      email: '',
      password: '',
      role: ''
    };
  }
}
