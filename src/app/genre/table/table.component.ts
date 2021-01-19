import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {Genre} from '../../core/models/genre';


@Component({
  selector: 'app-genre-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() genres: Genre[];
  displayedColumns: string[] = ['name', 'stationcount'];
  data = new MatTableDataSource([]);
  pageSize = 20;
  count = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.genres;
    this.data.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.genres.length > 0) {
      this.count = this.genres.length;
    }
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.data.data = this.genres.slice(0, this.pageSize);
  }

  /** Load next stations to table */
  pageChange(index): void {
    this.data.data = this.genres.slice(this.pageSize * index.pageIndex, this.pageSize * index.pageIndex + this.pageSize);
  }
}

