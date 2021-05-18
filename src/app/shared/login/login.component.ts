import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/user';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  loginUrl: string = environment.loginUrl;
  logoutUrl: string = environment.logoutUrl;

  constructor(userService: UserService) {
    userService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }
}
