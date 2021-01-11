import { Component, OnInit, Input } from '@angular/core';

import { Station } from '../../core/models/station';


@Component({
  selector: 'app-station-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() stations: Station[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
