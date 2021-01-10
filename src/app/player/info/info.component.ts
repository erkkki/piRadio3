import {Component, Input, OnInit} from '@angular/core';

import { Station } from '../../core/models/station';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-player-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() station$: ReplaySubject<Station>;
  station: Station;

  constructor() { }

  ngOnInit(): void {
    this.station$.subscribe(station => this.station = station);
  }

}
