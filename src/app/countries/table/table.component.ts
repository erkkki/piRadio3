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
  pageSize = 20;
  count = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.countries;
    this.data.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.countries === null) {
      return;
    }
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.count = this.countries.length;
    this.data.data = this.countries.slice(0, this.pageSize);
  }

  /** Load next stations to table */
  pageChange(index): void {
    this.data.data = this.countries.slice(this.pageSize * index.pageIndex, this.pageSize * index.pageIndex + this.pageSize);
  }

}
