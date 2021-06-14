import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../../core/models/radio.api.interfaces';

@Component({
  selector: 'app-shared-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  @Input() genres: Tag[];

  constructor() { }

  ngOnInit(): void {
  }

}
