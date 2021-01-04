import { Component, OnInit } from '@angular/core';

import { RadioApiService } from '../../core/services/radio-api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<any>;

  constructor(private radioApiService: RadioApiService) { }

  ngOnInit(): void {
    this.countries$ = this.radioApiService.getCountries();
  }

}
