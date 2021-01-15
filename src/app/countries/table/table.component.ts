import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Subscription} from 'rxjs';

import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Country} from '../../core/models/country';


@Component({
  selector: 'app-countries-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() countries: Country[];
  displayedColumns: string[] = ['name', 'stationcount'];
  data = new MatTableDataSource([]);
  countriesCount = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.countries;
    this.data.sort = this.sort;
  }

  changeCountry(country): void {
    localStorage.setItem('country', country);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data.data = this.countries;
    this.data.sort = this.sort;
    if (this.paginator) {
      this.data.paginator = this.paginator;
    }
    this.countriesCount = this.countries?.length;
  }

}
