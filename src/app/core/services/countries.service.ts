import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import { RadioApiService } from './radio-api.service';
import { Country } from '../models/country.interface';



@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: BehaviorSubject<Country[]>;

  constructor(private radioApiService: RadioApiService) {
    this.countries = new BehaviorSubject<Country[]>([]);
    this.loadCountriesFromApi();
  }

  getCountries(): Observable<Country[]> {
    if (this.countries.getValue().length > 0) {
      this.loadCountriesFromApi();
    }
    return this.countries;
  }

  private loadCountriesFromApi(): void {
    this.radioApiService.getCountries().pipe(first()).subscribe((result) => {
      this.countries.next(result);
    });
  }
}
