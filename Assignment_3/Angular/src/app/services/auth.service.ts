import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'https://localhost:7121/api/Authentication';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data);
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.api}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
