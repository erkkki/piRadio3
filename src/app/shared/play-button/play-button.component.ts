import { Component, OnInit, Input } from '@angular/core';

import { PlayerService } from '../../core/services/player.service';
import { Station } from '../../core/models/station';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  @Input() station: Station;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  changeStation(station: Station): void {
    this.playerService.station.next(station);
  }
}
