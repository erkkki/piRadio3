import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {ReplaySubject, Subscription} from 'rxjs';

import {PlayerService} from '../../core/services/player.service';

@Component({
  selector: 'app-player-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit, OnDestroy {

  playing: boolean;
  subscription: Subscription;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.playing = false;
    this.subscription = this.player.playing.subscribe(value => this.playing = value);
  }

  pause(): void {
    this.player.playing.next(!this.playing);
  }

  ngOnDestroy(): void {
  }

}
