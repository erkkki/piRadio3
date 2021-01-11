import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { Station } from '../../core/models/station';
import {ReplaySubject, Subscription} from 'rxjs';
import {PlayerService} from '../../core/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  station: Station;
  subscription: Subscription;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.subscription = this.player.station.subscribe(value => this.station = value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
