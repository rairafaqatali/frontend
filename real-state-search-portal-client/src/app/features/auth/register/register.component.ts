import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  loading = false;
  serverError: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.password?.value !== this.confirmPassword?.value) {
      this.serverError = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.serverError = null;

    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        this.loading = false;
        this.serverError =
          err?.error?.message ||
          (Array.isArray(err?.error) ? err.error.join(', ') : err?.error) ||
          'Registration failed';
      }
    });
  }
}
