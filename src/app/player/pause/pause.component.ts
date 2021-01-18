import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject, ReplaySubject, Subscription} from 'rxjs';

import {PlayerService} from '../../core/services/player.service';

@Component({
  selector: 'app-player-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit, OnDestroy {

  playing$: BehaviorSubject<boolean>;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.playing$ = this.player.playing;
  }

  pause(): void {
    this.player.togglePLaying();
  }

  ngOnDestroy(): void {
  }

}
