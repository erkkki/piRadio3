import {Component, Input, OnInit} from '@angular/core';

import {Station} from '../../core/models/station';
import {PlayerService} from '../../core/services/player.service';

@Component({
  selector: 'app-stations-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  @Input() station: Station;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
  }

  play(): void {
    this.player.station.next(this.station);
  }

}
