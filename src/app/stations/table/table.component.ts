import {Component, HostListener, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { getUserLocale  } from 'get-user-locale';

import {Station} from '../../core/models/station';
import {Genre} from '../../core/models/genre';

@Component({
  selector: 'app-station-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() stations: Station[];
  defaultDisplayedColumns: string[] = ['favicon', 'actions', 'station-name', 'clicktrend'];
  tabletDisplayedColumns: string[] = ['actions', 'station-name', 'clicktrend'];
  mobileDisplayedColumns: string[] = ['actions', 'station-name-compact', 'clicktrend-compact'];

  displayedColumns: string[];
  innerWidth: number;
  locale = 'en-US';

  constructor() {}

  ngOnInit(): void {
    this.locale = getUserLocale();
    this.responsiveColumns();
  }

  responsiveColumns(): void {
    const width = window.innerWidth;

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

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.responsiveColumns();
  }


}
