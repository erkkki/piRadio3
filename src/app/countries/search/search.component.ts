import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import { Country } from '../../core/models/country';

@Component({
  selector: 'app-countries-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() countries: Country[] = [];
  filteredCountries: Country[];
  value = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredCountries = this.countries;
  }

  search(): void {
    if (!this.countries) {
      return;
    }
    this.filteredCountries = this.countries.filter((country) => {
      return country.name.toLowerCase().startsWith(this.value.toLowerCase());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.search();
  }
}
