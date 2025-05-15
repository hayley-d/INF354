import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // User entered values
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    // Call the AuthService with values
    this.auth.register({
      username: this.email,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        // Redirect to the login page with query params set
        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' }
        });
      },
      error: () => {
        this.message = 'Registration failed. Try again.';
      }
    });
  }
}
