import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { Station } from '../../core/models/station';
import {ReplaySubject, Subscription} from 'rxjs';
import {PlayerService} from '../../core/services/player.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-player-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  station: Station;
  error: any;
  subscription: Subscription[];
  mediaQueryList: MediaQueryList;

  constructor(private player: PlayerService, private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 500px)');
    this.subscription = [];
    let sub = this.player.station.subscribe(value => {
      this.station = value;
      this.error = null;
    });
    this.subscription.push(sub);
    sub = this.player.error.subscribe(value => this.error = value);
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
