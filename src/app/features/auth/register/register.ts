import { Component ,ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../../../core/services/auth.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './register.html',
  standalone:true,
  styleUrl: './register.css',
})
export class Register {

  
  form :FormGroup

  loading = false;
  message = '';
  error = '';

  constructor(private authService: AuthService,
    private cdr:ChangeDetectorRef,
    private fb:FormBuilder,
    private router:Router
  ) {
     this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    this.message = '';
    this.error = '';

    this.loading = true;

    this.authService.register(this.form.value)
      .subscribe({
        next: (res: any) => {
          this.message = res;
          this.loading = false;
            this.form.reset({
        name: '',
        email: '',
        password: ''
      });
       setTimeout(() => {
    this.router.navigate(['/login']);
  }, 4000);
          this.cdr.detectChanges();
        },
        
        error: (err) => {
            this.loading = false;

          if (err.status === 400 && err.error?.errors?.length) {
            this.error = err.error.errors[0].defaultMessage;
          } else {
            this.error = err.message || 'Registration failed';
          }
        
           const parsed = JSON.parse(err.error);
          this.error = parsed.message || 'Registration failed';
          this.cdr.detectChanges();
        }
      });
  }


}
