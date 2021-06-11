import {Component, OnDestroy, OnInit} from '@angular/core';

import {GenresService} from '../../core/services/genres.service';
import { Genre } from '../../core/models/genre.interface';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, OnDestroy {

  value = '';
  genres: Genre[] = [];
  filteredGenres: Genre[] = [];
  subscriptions: Subscription[] = [];


  constructor(private genreService: GenresService) { }


  ngOnInit(): void {
    let sub: Subscription;
    sub = this.genreService.genres.pipe(filter(value => value !== null)).subscribe(value => {
      this.genres = value;
      this.filteredGenres = value.filter(genre => (genre.stationcount > 100));
    });
    this.subscriptions.push(sub);
  }

  search(): void {
    if (!this.genres) {
      return;
    }
    this.filteredGenres = this.genres.filter((genre) => {
      return (genre.name.toLowerCase().startsWith(this.value.toLowerCase()) && genre.stationcount > 100);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
