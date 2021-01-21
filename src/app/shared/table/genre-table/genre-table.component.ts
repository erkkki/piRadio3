import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Genre} from '../../../core/models/genre';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-shared-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.scss']
})
export class GenreTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() genres: Genre[];
  @Input() showSort: string | boolean = true;
  @Input() showPaginator: string | boolean = true;
  @Input() pageSize = 20;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['name', 'stationcount'];
  data = new MatTableDataSource([]);
  count = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.genres;
    this.data.sort = this.sort;
  }

  ngAfterViewInit(): void {
    /** Sort change */
    const sub = this.sort.sortChange.subscribe(() => {
      const data = this.genres.slice();
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
    if (typeof this.showPaginator === 'string' && this.showPaginator === 'false') {
      this.showPaginator = false;
    }
    if (typeof this.showSort === 'string' && this.showSort === 'false') {
      this.showSort = false;
    }
    if (this.genres === null) {
      return;
    }
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.count = this.genres.length;
    this.data.data = this.genres.slice(0, this.pageSize);
  }

  /** Load next stations to table */
  pageChange(index): void {
    this.data.data = this.genres.slice(this.pageSize * index.pageIndex, this.pageSize * index.pageIndex + this.pageSize);
  }
}
