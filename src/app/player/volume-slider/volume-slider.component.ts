import {Component, OnDestroy, OnInit} from '@angular/core';

import { PlayerService } from '../../core/services/player.service';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-player-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.scss']
})
export class VolumeSliderComponent implements OnInit, OnDestroy {

  sub: Subscription;
  volume$: BehaviorSubject<number>;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.volume$ = this.player.volume;
  }

  volumeChange(event): void {
    this.player.volume.next(event.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
