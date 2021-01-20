import { Component, OnInit } from '@angular/core';
import {RadioApiService} from '../../core/services/radio-api.service';
import {Station} from '../../core/models/station';
import {Observable} from 'rxjs';
import {GenresService} from '../../core/services/genres.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  topStation$: Observable<any[]>;
  genres$: Observable<any[]>;

  constructor(
    private radioApi: RadioApiService,
    private genreService: GenresService) {}

  ngOnInit(): void {
    this.topStation$ = this.radioApi.getTopStation();
    this.genres$ = this.genreService.genres;
  }
}
