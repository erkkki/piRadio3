import {Component, Input, OnInit} from '@angular/core';

import { Station } from '../../core/models/station';

@Component({
  selector: 'app-shared-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  @Input() station: Station;

  constructor() { }

  ngOnInit(): void {
  }


  favorite(): void {

  }
}
