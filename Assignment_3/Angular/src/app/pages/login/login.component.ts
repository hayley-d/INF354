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
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['registered'] === 'true') {
      this.message = 'Registered successfully.';
    }
  });
}

  onSubmit() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}




