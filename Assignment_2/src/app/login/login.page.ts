import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username : string = "";
  password : string = "";

  constructor(private router : Router) { }

  ngOnInit() {
  }

  login(){
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    //Check login details
    if (storedUser.username === this.username && storedUser.password === this.password){
      this.router.navigateByUrl('/tabs');
    } else{
      alert('Failed to login: Invalid username or password');
    }
  }

  goToSignup(){
    this.router.navigateByUrl('/signup');
  }

}
