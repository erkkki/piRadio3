import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import {BehaviorSubject, Observable} from 'rxjs';

import {GenresService} from '../../core/services/genres.service';
import {RadioApiService} from '../../core/services/radio-api.service';
import {StationHistoryService} from '../../core/services/station-history.service';
import { Station } from '../../core/models/station.interface';
import {Genre} from '../../core/models/genre.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  stats$: Observable<any>;
  topStation$: Observable<Station[]>;
  genres$: Observable<Genre[]>;
  history$: Observable<Station[]>;

  angular = environment.angular;
  material = environment.material;
  clappr = environment.clappr;

  constructor(
    private radioApi: RadioApiService,
    private genreService: GenresService,
    private stationHistoryService: StationHistoryService,
  ) {}

  ngOnInit(): void {
    this.topStation$ = this.radioApi.getTopStation();
    this.genres$ = this.genreService.topTwenty;
    this.stats$ = this.radioApi.getStats();
    this.history$ = this.stationHistoryService.stations$;
  }
}
