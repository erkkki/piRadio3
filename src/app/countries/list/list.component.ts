import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CountriesService} from '../../core/services/countries.service';
import {Country} from '../../core/models/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  countries: Country[];


  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countriesService.countries.subscribe(value => {
      this.countries = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeCountry(country): void {
    localStorage.setItem('country', country);
  }

}
