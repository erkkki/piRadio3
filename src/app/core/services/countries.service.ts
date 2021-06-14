import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import { RadioApiService } from './radio-api.service';
import {Country} from '../models/radio.api.interfaces';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly countries: BehaviorSubject<Country[]>;

  constructor(private radioApiService: RadioApiService) {
    this.countries = new BehaviorSubject<Country[]>([]);
  }

  getCountries(): Observable<Country[]> {
    if (this.countries.getValue().length === 0) {
      this.radioApiService.getCountries().subscribe(countries => {
        this.countries.next(countries);
      });
    }
    return this.countries;
  }
}
