import {Component, forwardRef, OnInit} from '@angular/core';

import {filter} from 'rxjs/operators';

import { Genre } from '../../../core/models/genre';
import { GenresService } from '../../../core/services/genres.service';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

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
export class GenreSelectComponent implements OnInit, ControlValueAccessor {

  form = new FormGroup({
    genre: new FormControl(''),
  });
  genres: Genre[];

  constructor(private genreService: GenresService) { }

  ngOnInit(): void {
    this.genreService.genres
      .pipe(
        filter(result => result !== null)
      ).subscribe((result) => {
        this.genres = result.filter((genre) => {
          return (genre.stationcount > 200);
        });
      });
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

}
