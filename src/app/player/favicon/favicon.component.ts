import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from '../../core/services/player.service';
import {Station} from '../../core/models/station';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-player-favicon',
  templateUrl: './favicon.component.html',
  styleUrls: ['./favicon.component.scss']
})
export class FaviconComponent implements OnInit, OnDestroy{

  station: Station;
  faviconerror: boolean;
  sub: Subscription;

  constructor(private player: PlayerService) { }

  ngOnInit(): void {
    this.sub = this.player.station.subscribe(station => {
      this.station = station;
      this.faviconerror = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
