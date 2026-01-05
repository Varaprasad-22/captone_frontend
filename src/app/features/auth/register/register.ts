import { Component ,ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../../../core/services/auth.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  
  form = {
    name: '',
    email: '',
    password: ''
  };

  loading = false;
  message = '';
  error = '';

  constructor(private authService: AuthService,
    private cdr:ChangeDetectorRef
  ) {}

  submit() {
    this.message = '';
    this.error = '';

    this.loading = true;

    this.authService.register(this.form)
      .subscribe({
        next: (res: any) => {
          this.message = res;
          this.loading = false;
          this.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.status === 400 && err.error?.errors?.length) {
            this.error = err.error.errors[0].defaultMessage;
          } else {
            this.error = err.error || 'Registration failed';
          }
          this.loading = false;
          
          this.cdr.detectChanges();
        }
      });
  }

  resetForm() {
    this.form = {
      name: '',
      email: '',
      password: ''
    };
  }
}
