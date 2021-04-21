import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { People } from '../models/people';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, dob: string): Observable<any> {

    let userInfo = {
      username: username,
      dob: dob,
      error: '',
      loader: false,
    };

    const url = `https://swapi.dev/api/people/?search=${userInfo.username}`
    return this.http.get<User>(url);
  }

  getUser(): Observable<People> {
    const url = `https://swapi.dev/api/planets/?page=1`;
    return this.http.get<People>(url);
  }
}
