import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private httpClient: HttpClient) {}
  //Send Http Post request to server
  sendPostRequest(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(
      'http://localhost:3000/users/register',
      data,
      {
        headers: headers,
      }
    );
  }

  authenticateUser(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(
      'http://localhost:3000/users/authenticate',
      data,
      {
        headers: headers,
      }
    );
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();

    return this.httpClient.get('http://localhost:3000/users/profile', {
      headers: {
        Authorization: token,
      },
    });
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }
}
