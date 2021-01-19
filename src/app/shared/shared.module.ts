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
import { FavoriteComponent } from './favorite/favorite.component';
import { ClapprComponent } from './clappr/clappr.component';
import { FocusDirective } from './directives/focus.directive';
import { StationTableComponent } from './table/station-table/station-table.component';
import {MatTableModule} from '@angular/material/table';
import {FlexModule} from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
    FavoriteComponent,
    ClapprComponent,
    FocusDirective,
    StationTableComponent,
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
    MatTableModule,
    FlexModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
    FavoriteComponent,
    ClapprComponent,
    FocusDirective,
    StationTableComponent,
  ]
})
export class SharedModule { }
