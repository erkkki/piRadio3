import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user.interface';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: BehaviorSubject<User>;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentUser = new BehaviorSubject<User>(null);
    this.getUser();
  }

  getUser(): void {
    this.http.get(this.apiUrl + '/api/user', { withCredentials: true }).subscribe((value: User) => this.currentUser.next(value));
  }
}
