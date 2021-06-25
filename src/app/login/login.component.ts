import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/user/login-request.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  onUserLogin(): void {
    if (this.loginForm.valid) {
      const request = new LoginRequest();
      request.username = this.loginForm.value.username;
      request.password = this.loginForm.value.password;
      this.userService.userLogin(request).then(user => {
        this.userService.setUser(user);
        this.router.navigate(['home']);
      });
    }
  }
}
