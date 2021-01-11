import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Station} from '../../core/models/station';

@Component({
  selector: 'app-station-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() stations: Station[];
  defaultDisplayedColumns: string[] = ['play', 'name', 'tags', 'clickcount', 'country'];
  tabletDisplayedColumns: string[] = ['play', 'name', 'tags', 'country'];
  mobileDisplayedColumns: string[] = ['play', 'name', 'country'];
  displayedColumns: string[];
  innerWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.responsiveColumns();
  }

  responsiveColumns(): void {
    const width = window.innerWidth;

    /* For phones */
    if (width < 768) {
      this.displayedColumns = this.mobileDisplayedColumns;
      return;
    }
    /* For tablets */
    if (width < 992) {
      this.displayedColumns = this.tabletDisplayedColumns;
      return;
    }
    /* Rest */
    else {
      this.displayedColumns = this.defaultDisplayedColumns;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.responsiveColumns();
  }


}
