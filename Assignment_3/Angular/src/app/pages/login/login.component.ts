import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  // User entered values
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  /**
   * Lifecycle method called after component instantiation.
   * If the user was redirected here after registration it shows a success message.
   */
  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    // Check query params to see if it should display message
    if (params['registered'] === 'true') {
      this.message = 'Registered successfully.';
    }
  });
}

  /**
   * Handles login form submission.
   * Calls the AuthService with user credentials.
   * On success:
   * - Saves JWT token in localStorage
   * - Redirects to the `/products` page
   * On failure:
   * - Alerts the user that credentials are invalid
   */
  onSubmit() {
    // Call the AuthService
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        // Store the token
        localStorage.setItem('token', res.token);
        // Redirect to products page
        this.router.navigate(['/products']);
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}




