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
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() countries: Country[];
  subscriptions: Subscription[] = [];
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

  ngAfterViewInit(): void {
    /** Sort change */
    const sub = this.sort.sortChange.subscribe(() => {
      const data = this.countries.slice();
      this.paginator.pageIndex = 0;
      const isAsc = this.sort.direction !== 'asc';
      data.sort((a, b) => {
        switch (this.sort.active) {
          case 'stationcount': return this.compare(a.stationcount, b.stationcount, isAsc);
          case 'name': return this.compare(a.name, b.name, isAsc);
          default: return 0;
        }
      });
      this.data.data = data.slice(0, this.pageSize);
      this.data.data = data;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
