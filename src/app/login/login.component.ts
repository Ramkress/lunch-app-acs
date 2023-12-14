import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



// import {MatDialog} from '@angular/material'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginSubscription: Subscription | undefined;

  constructor(private router: Router,private authService:AuthService,private cookieService: CookieService) { }
  showSpinner: boolean = false; 
  username!: any;
  password!: any;
  // loginmethode:any; 
 
  ngOnInit() {
  }
 
  setToken(token: string): void {
    this.cookieService.set('yourTokenKey', token);
  }
 
  login() : void {
    // const credentials = { username: this.username, password: this.password};
    var key = this.authService.keygeneration(this.username, this.password);
    var credentials = { authenticity_token: key };
    this.loginSubscription = this.authService.login(credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful', response);
        this.router.navigate(["user"]);
        localStorage.setItem('loginData', JSON.stringify(response));
        const token = response.user.api_key; 
        this.setToken(token)
        // this.userComponent.initialData(response)
        this.authService.changeMessage(response);
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
        alert("Invalid credentials");
      }
    );





  }
  ngOnDestroy(): void {
    // Unsubscribe from any remaining subscriptions when the component is destroyed
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }


  }


function setToken(token: any, string: any) {
  throw new Error('Function not implemented.');
}

