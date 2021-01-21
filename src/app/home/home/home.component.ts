import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import {Observable} from 'rxjs';

import {GenresService} from '../../core/services/genres.service';
import {RadioApiService} from '../../core/services/radio-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  stats$: Observable<any>;
  topStation$: Observable<any[]>;
  genres$: Observable<any[]>;

  angular = environment.angular;
  material = environment.material;
  clappr = environment.clappr;

  constructor(
    private radioApi: RadioApiService,
    private genreService: GenresService) {}

  ngOnInit(): void {
    this.topStation$ = this.radioApi.getTopStation();
    this.genres$ = this.genreService.topTwenty;
    this.stats$ = this.radioApi.getStats();
  }
}
