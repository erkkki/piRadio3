import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

import { RadioApiService } from './radio-api.service';
import { Genre } from '../models/genre.interface';



@Injectable({
  providedIn: 'root'
})
export class GenresService {

  genres: BehaviorSubject<Genre[]>;
  topTwenty: BehaviorSubject<Genre[]>;

  constructor(private radioApiService: RadioApiService) {
    this.genres = new BehaviorSubject<Genre[]>(null);
    this.topTwenty = new BehaviorSubject<Genre[]>(null);
    this.radioApiService.getTags().pipe(first()).subscribe((result: Genre[]) => {
      this.genres.next(result);
      const top = result.sort((a, b) => b.stationcount - a.stationcount).slice(0, 20);
      this.topTwenty.next(top);
    });
  }
}
