import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

import {filter} from 'rxjs/operators';

import { CountriesService } from '../../../core/services/countries.service';
import { Country } from '../../../core/models/country.interface';



@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true
    }
  ]
})
export class CountrySelectComponent implements OnInit, ControlValueAccessor {

  form = new FormGroup({
    country: new FormControl(''),
  });

  countries: Country[];

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countryService.countries
      .pipe(
        filter(result => result !== null)
      )
      .subscribe((result) => {
        this.countries = result.filter((country) => {
          return (country.stationcount > 0);
        });
      });
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {}
  writeValue(obj: any): void {
    if (!obj) {
      this.form.reset();
      return;
    }
    this.form.patchValue(obj);
  }
}


