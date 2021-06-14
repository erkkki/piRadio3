import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import {BehaviorSubject, Observable} from 'rxjs';

import {GenresService} from '../../core/services/genres.service';
import {RadioApiService} from '../../core/services/radio-api.service';
import {StationHistoryService} from '../../core/services/station-history.service';
import {Station, Tag} from '../../core/models/radio.api.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  stats$: Observable<any>;
  topStation$: Observable<Station[]>;
  genres$: Observable<Tag[]>;
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
    this.topStation$ = this.radioApi.searchStationsByVotes();
    /** TODO top genres */
    this.genres$ = this.genreService.getGenres();
    this.stats$ = this.radioApi.getServerStats();
    this.history$ = this.stationHistoryService.stations$;
  }
}
