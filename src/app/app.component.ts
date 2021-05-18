import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';
import {StationHistoryService} from './core/services/station-history.service';
import {UserService} from './core/services/user.service';
import {User} from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  mediaQueryList: MediaQueryList;
  sideNavOpen = true;
  sub: Subscription[];

  currentUser: User;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private mediaMatcher: MediaMatcher,
    /** Just loading services here to have them loaded all. */
    private stationHistoryService: StationHistoryService,
    private userService: UserService,
  ) {
    this.sub = [];
    this.userService.currentUser.subscribe(user => this.currentUser);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    /** To fix ExpressionChangedAfterItHasBeenCheckedError */
    setTimeout(() => {
      this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 768px)');
      let sub = this.sidenav.openedStart.subscribe(val => {
        this.sideNavOpen = true;
      });
      this.sub.push(sub);
      sub = this.sidenav.closedStart.subscribe(val => {
        this.sideNavOpen = false;
      });
      this.sub.push(sub);
    });
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}

