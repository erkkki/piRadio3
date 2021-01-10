import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

import { RadioApiService } from './radio-api.service';
import { Genre } from '../models/genre';



@Injectable({
  providedIn: 'root'
})
export class GenresService {

  genres: BehaviorSubject<Genre[]>;

  constructor(private radioApiService: RadioApiService) {
    this.genres = new BehaviorSubject<Genre[]>(null);
    this.radioApiService.getTags().pipe(first()).subscribe((result) => {
      this.genres.next(result);
    });
  }
}
