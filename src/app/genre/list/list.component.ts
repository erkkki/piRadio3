import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../core/models/country';
import {Genre} from '../../core/models/genre';

@Component({
  selector: 'app-genres-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() genres: Genre[];

  constructor() { }

  ngOnInit(): void {
  }

}
