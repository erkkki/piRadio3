import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';

import {Country} from '../../core/models/country';
import {CountriesService} from '../../core/services/countries.service';
import {Subscription} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-countries-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  displayedColumns: string[] = ['name', 'stations'];
  countries: Country[];
  sortedData: Country[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countriesService.countries.subscribe(value => {
      this.countries = value;
      this.sortedData = value;
    });
  }

  sortData(sort: Sort): void {
    const data = this.countries.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'stations': return this.compare(a.stationcount, b.stationcount, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeCountry(country): void {
    localStorage.setItem('country', country);
  }

}
