import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import { Genre } from '../../../core/models/genre.interface';
import { GenresService } from '../../../core/services/genres.service';

@Component({
  selector: 'app-genre-select',
  templateUrl: './genre-select.component.html',
  styleUrls: ['./genre-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenreSelectComponent),
      multi: true
    }
  ]
})
export class GenreSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  form = new FormGroup({
    genre: new FormControl(''),
  });
  genres: Genre[];
  subscriptions: Subscription[] = [];

  constructor(private genreService: GenresService) { }

  ngOnInit(): void {
    let sub: Subscription;

    sub = this.genreService.genres
      .pipe(
        filter(result => result !== null)
      ).subscribe((result) => {
        this.genres = result.filter((genre) => {
          return (genre.stationcount > 100);
        });
      });
    this.subscriptions.push(sub);
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {}
  writeValue(obj: any): void {
    if (!obj) {
      this.form.reset();
      return;
    }
    this.form.patchValue(obj);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
