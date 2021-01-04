import { Component, OnInit, Input } from '@angular/core';

import { Station } from '../../core/models/station';


@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  @Input() stations: Station[];

  constructor() { }

  ngOnInit(): void {
  }

}
