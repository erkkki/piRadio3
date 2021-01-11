import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Station} from '../../core/models/station';

@Component({
  selector: 'app-station-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() stations: Station[];
  displayedColumns: string[] = ['name', 'tags', 'clickcount', 'country'];
  innerWidth: number;

  constructor() { }


  ngOnInit(): void {
    this.responsiveColumns();
  }

  responsiveColumns(): void {
    const width = window.innerWidth;
    if (width < 600) {
      this.displayedColumns = ['name', 'country'];
    }
    else {
      this.displayedColumns = ['name', 'tags', 'clickcount', 'country'];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.responsiveColumns();
  }


}
