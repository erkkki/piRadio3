import {Component, Input, OnInit} from '@angular/core';
import {Genre} from '../../../core/models/genre';

@Component({
  selector: 'app-shared-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  @Input() genres: Genre[];

  constructor() { }

  ngOnInit(): void {
  }

}
