import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { PlayButtonComponent } from './play-button/play-button.component';
import { GenreSelectComponent } from './input/genre-select/genre-select.component';
import { CountrySelectComponent } from './input/country-select/country-select.component';



@NgModule({
  declarations: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
  ],
    imports: [
      RouterModule,
      CommonModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatTabsModule,
      MatSelectModule,
      MatInputModule,
      MatButtonToggleModule,
      ReactiveFormsModule,
    ],
  exports: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
  ]
})
export class SharedModule { }
