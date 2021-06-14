import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../core/models/radio.api.interfaces';

@Component({
  selector: 'app-shared-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  @Input() countries: Country[];

  constructor() { }

  ngOnInit(): void {
  }

}
