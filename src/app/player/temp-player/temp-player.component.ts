import { Component, OnInit } from '@angular/core';


import { PlayerService } from '../../core/services/player.service';

import { Station } from '../../core/models/station';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-temp-player',
  templateUrl: './temp-player.component.html',
  styleUrls: ['./temp-player.component.scss']
})
export class TempPlayerComponent implements OnInit {

  station: ReplaySubject<Station>;
  playState: ReplaySubject<boolean>;


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.station = this.playerService.station;
    this.playState = this.playerService.playing;
  }

}
