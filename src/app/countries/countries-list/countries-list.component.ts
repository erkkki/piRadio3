import { Component, OnInit, Input } from '@angular/core';

import {Country} from '../../core/models/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() countries: Country[];

  constructor() { }

  ngOnInit(): void {
  }

  changeCountry(country): void {
    localStorage.setItem('country', country);
  }

}
