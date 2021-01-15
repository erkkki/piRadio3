import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {Subscription} from 'rxjs';

import {Country} from '../../core/models/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() countries: Country[];

  constructor() { }

  ngOnInit(): void {}

  changeCountry(country): void {
    localStorage.setItem('country', country);
  }

}
