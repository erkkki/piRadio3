import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from '../../core/services/player.service';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-player-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit, OnDestroy {

  volume: number;
  tempVolume = 0;
  muted = false;
  sub: Subscription;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.sub = this.player.volume.subscribe(value => {
      this.volume = value;
      this.muted = value === 0;
    });
  }

  toggle(event): void {
    if (this.muted) {
      this.player.volume.next(this.tempVolume);
    } else {
      this.muted = true;
      this.tempVolume = this.volume;
      this.player.volume.next(0);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
