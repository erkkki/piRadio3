import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from '../../core/services/countries.service';

import { Country } from '../../core/models/country';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  countries: Country[];
  filteredCountries: Country[];
  subscription: Subscription;
  value = '';

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countryService.countries.subscribe(value => {
      this.countries = value;
      this.filteredCountries = value;
    });
  }

  search(): void {
    if (!this.countries) {
      return;
    }
    this.filteredCountries = this.countries.filter((country) => {
      return country.name.toLowerCase().startsWith(this.value.toLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
