import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input() countries: any;

  constructor() { }

  ngOnInit(): void {
  }

}
