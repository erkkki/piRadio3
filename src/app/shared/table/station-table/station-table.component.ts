import {
  Component, HostListener, Input, OnInit, ViewChild, OnChanges,
  SimpleChanges, AfterViewInit, OnDestroy, HostBinding, ElementRef, AfterViewChecked
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MediaMatcher} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';

import {Station} from '../../../core/models/station';
import Table = WebAssembly.Table;

@Component({
  selector: 'app-shared-station-table',
  templateUrl: './station-table.component.html',
  styleUrls: ['./station-table.component.scss']
})
export class StationTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() stations: Station[];
  sortedStations: Station[];
  subscriptions: Subscription[] = [];

  data: MatTableDataSource<Station>;
  defaultDisplayedColumns: string[] = ['favicon', 'actions', 'station-name', 'clicktrend'];
  tabletDisplayedColumns: string[] = ['actions', 'station-name', 'clicktrend'];
  mobileDisplayedColumns: string[] = ['actions', 'station-name-compact', 'votes', 'clicktrend-compact'];
  displayedColumns: string[];

  stationCount = 0;
  pageSize = 20;

  @ViewChild('container') container: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mediaMatcher: MediaMatcher) {
    this.data = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.displayedColumns = this.defaultDisplayedColumns;
  }

  ngAfterViewInit(): void {
    /** To fix ExpressionChangedAfterItHasBeenCheckedError */
    setTimeout(() => {
      this.responsiveColumns();
    });

    /** Sort change */
    const sub = this.sort.sortChange.subscribe(() => this.sortData());
    this.subscriptions.push(sub);


  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  sortData(): void {
    const data = this.stations.slice();
    this.paginator.pageIndex = 0;
    const isAsc = this.sort.direction !== 'asc';
    data.sort((a, b) => {
      switch (this.sort.active) {
        case 'clicktrend': return this.compare(a.votes, b.votes, isAsc);
        case 'votes': return this.compare(a.votes, b.votes, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
    this.data.data = data.slice(0, this.pageSize);
    this.sortedStations = data;
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /** Input data changed, load new data to table */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.stations === null) {
      return;
    }
    if (this.stations.length > 0) {
      this.stationCount = this.stations.length;
      /* Load first page */
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.sortedStations = this.stations;
      this.data.data = this.sortedStations.slice(0, this.pageSize);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.responsiveColumns();
  }

  /** Load next stations to table */
  pageChange(index): void {
    this.data.data = this.sortedStations.slice(this.pageSize * index.pageIndex, this.pageSize * index.pageIndex + this.pageSize);
  }

  responsiveColumns(): void {
    const width = this.container.nativeElement.offsetWidth;
    /* For phones */
    if (width < 600) {
      this.displayedColumns = this.mobileDisplayedColumns;
      return;
    }
    /* For tablets */
    if (width < 960) {
      this.displayedColumns = this.tabletDisplayedColumns;
      return;
    }
    /* Rest */
    else {
      this.displayedColumns = this.defaultDisplayedColumns;
    }
  }
}
