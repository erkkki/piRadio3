import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {PlayerService} from './core/services/player.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  mediaQueryList: MediaQueryList;
  sideNavOpen = true;
  sub: Subscription[];

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private mediaMatcher: MediaMatcher,
    private player: PlayerService) {
    this.sub = [];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 768px)');
    let sub = this.sidenav.openedStart.subscribe(val => {
      this.sideNavOpen = true;
    });
    this.sub.push(sub);
    sub = this.sidenav.closedStart.subscribe(val => {
      this.sideNavOpen = false;
    });
    this.sub.push(sub);
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}

