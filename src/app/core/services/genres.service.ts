import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {RadioApiService} from './radio-api.service';
import {Tag} from '../models/radio.api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly genres: BehaviorSubject<Tag[]>;

  constructor(private radioApiService: RadioApiService) {
    this.genres = new BehaviorSubject<Tag[]>([]);
  }

  getGenres(): Observable<Tag[]> {
    if (this.genres.getValue().length === 0) {
      this.radioApiService.getTags({params: {limit: 10000}}).subscribe(genres => {
        this.genres.next(genres);
      });
    }
    return this.genres;
  }
}
