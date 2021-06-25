import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/user/login-request.model';
import { LoginUser } from '../models/user/login-user.model';
import { UserConfig } from '../models/user/user-config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  private user: LoginUser;

  userLogin(user: LoginRequest): Promise<LoginUser> {
    const method = environment.api + 'users/login';
    return this.http.post<LoginUser>(method, user).toPromise();
  }

  isAuthenticated(): boolean {
    return (this.getUser()) ? true : false;
  }

  getToken(): string {
    const user = this.getUser();
    return (user) ? user.token : '';
  }

  userLogout(): void {
    this.user = undefined;
    localStorage.removeItem('USER');
  }

  setUser(user: LoginUser): void {
    this.user = user;
    localStorage.setItem('USER', JSON.stringify(user));
  }

  getUser(): LoginUser {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('USER'));
    }
    return this.user;
  }

  getUserConfig(userId: number): Promise<UserConfig> {
    const method = environment.api + 'users/config';
    return this.http.get<UserConfig>(method, { params: { "userId": userId.toString() } }).toPromise();
  }

  saveUserConfig(config: UserConfig): Promise<UserConfig> {
    const method = environment.api + 'users/config';
    return this.http.put<UserConfig>(method, config).toPromise();
  }
}
