import { Component, OnInit } from '@angular/core';


import { PlayerService } from '../../core/services/player.service';


import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {StationHistoryService} from '../../core/services/station-history.service';

import {Station} from '../../core/models/radio.api.interfaces';

@Component({
  selector: 'app-temp-player',
  templateUrl: './temp-player.component.html',
  styleUrls: ['./temp-player.component.scss']
})
export class TempPlayerComponent implements OnInit {

  station: BehaviorSubject<Station>;
  playState: BehaviorSubject<boolean>;
  stationHistory$: BehaviorSubject<Station[]>;

  constructor(
    private playerService: PlayerService,
    private stationHistoryService: StationHistoryService,
  ) { }

  ngOnInit(): void {
    this.station = this.playerService.station;
    this.playState = this.playerService.playing;
    this.stationHistory$ = this.stationHistoryService.stations$;
  }

}
