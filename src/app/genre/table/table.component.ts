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
  count = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.genres;
    this.data.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data.data = this.genres;
    this.data.sort = this.sort;
    if (this.paginator) {
      this.data.paginator = this.paginator;
    }
  }
}

