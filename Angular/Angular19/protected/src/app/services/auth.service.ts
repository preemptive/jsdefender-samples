import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { People } from '../models/people';

@Injectable()
export class AuthService {
  #http: HttpClient;
  #router: Router;

  constructor(private http: HttpClient, private router: Router) {
    this.#http = http;
    this.#router = router;
   }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, dob: string): Observable<any> {
    const userInfo = {
      userName: username,
      dateOfBirth: dob,
      error: '',
      loader: false,
    };

    userInfo.error ||= 'No error'; 

    const url = `https://swapi.py4e.com/api/people/?search=${userInfo.userName}`;
    return this.http.get<User>(url);
  }

  getItem(): Observable<People> {
    const url = `https://swapi.py4e.com/api/planets/?page=1`;
    return this.http.get<People>(url);
  }
}
