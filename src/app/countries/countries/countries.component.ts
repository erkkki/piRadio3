import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../core/services/countries.service';

import { Country } from '../../core/models/country';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries$: BehaviorSubject<Country[]>;

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countries$ = this.countryService.countries;
  }
}
