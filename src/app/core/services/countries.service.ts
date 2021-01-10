import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

import { RadioApiService } from './radio-api.service';
import { Country } from '../models/country';



@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: BehaviorSubject<Country[]>;

  constructor(private radioApiService: RadioApiService) {
    this.countries = new BehaviorSubject<Country[]>(null);
    this.radioApiService.getCountries().pipe(first()).subscribe((result) => {
      this.countries.next(result);
    });
  }
}
