import { Component, OnInit, Input } from '@angular/core';

import { PlayerService } from '../../core/services/player.service';
import { Station } from '../../core/models/station';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-shared-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  @Input() station: Station;
  playerStation$: BehaviorSubject<Station>;
  playerPlaying$: BehaviorSubject<boolean>;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerStation$ = this.playerService.station;
    this.playerPlaying$ = this.playerService.playing;
  }

  changeStation(station: Station): void {
    this.playerService.station.next(station);
  }
}
