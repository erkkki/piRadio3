import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries$ = this.countriesService.countries;
  }

}
