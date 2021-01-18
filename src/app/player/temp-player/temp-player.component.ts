import { Component, OnInit } from '@angular/core';


import { PlayerService } from '../../core/services/player.service';

import { Station } from '../../core/models/station';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-temp-player',
  templateUrl: './temp-player.component.html',
  styleUrls: ['./temp-player.component.scss']
})
export class TempPlayerComponent implements OnInit {

  station: BehaviorSubject<Station>;
  playState: BehaviorSubject<boolean>;


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.station = this.playerService.station;
    this.playState = this.playerService.playing;
  }

}
