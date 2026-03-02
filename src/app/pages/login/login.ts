import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule],
  
})
export class LoginComponent {
  loginForm: FormGroup;
   loading = signal(false);
    error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.loading.set(false))) 
      .subscribe({
        next: (res) => this.router.navigate(['/dashboard']),
        error: (err) => this.error.set(err.error?.error || 'Войти не удалось'), 
      });
  }
}
