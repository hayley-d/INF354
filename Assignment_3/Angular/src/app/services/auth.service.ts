import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for all authentication API endpoints.
  private api = 'http://localhost:5184/api/Authentication';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sends a login request to the backend with the provided credentials.
   * @param data - Object containing `username` and `password`
   * @returns An Observable containing a JWT token on success
   */
  login(data: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data);
  }

  /**
   * Sends a registration request to the backend with new user details.
   * @param data - Object containing `username`, `email`, and `password`
   * @returns An Observable from the backend's response
   */
  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.api}/register`, data);
  }

  /**
   * Logs the user out by clearing the token from local storage
   * and redirecting them to the login page.
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Checks whether the user is currently logged in by verifying the presence of a token.
   * @returns `true` if a token exists, otherwise `false`
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  /**
   * Retrieves the stored JWT token from local storage.
   * @returns The JWT token as a string, or `null` if not found
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
