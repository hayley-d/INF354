import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username : string = "";
  password : string = "";

  constructor(private router : Router) { }

  ngOnInit() {
  }

  signup(){
    const newUser = {username : this.username, password : this.password};
    localStorage.setItem('user', JSON.stringify(newUser));
    alert("Signup Successful, please continue to login");
    this.router.navigateByUrl('/login');
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

}
