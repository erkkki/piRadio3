import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

import { PlayButtonComponent } from './play-button/play-button.component';
import { GenreSelectComponent } from './input/genre-select/genre-select.component';
import { CountrySelectComponent } from './input/country-select/country-select.component';
import { ClapprComponent } from './clappr/clappr.component';
import { FocusDirective } from './directives/focus.directive';
import { StationTableComponent } from './table/station-table/station-table.component';
import { GenreTableComponent } from './table/genre-table/genre-table.component';
import { GenreListComponent } from './list/genre-list/genre-list.component';
import { CountryListComponent } from './list/country-list/country-list.component';
import { CountryTableComponent } from './table/country-table/country-table.component';



@NgModule({
  declarations: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
    ClapprComponent,
    FocusDirective,
    StationTableComponent,
    GenreTableComponent,
    GenreListComponent,
    CountryListComponent,
    CountryTableComponent,
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
    MatCardModule,
    MatListModule,
  ],
  exports: [
    PlayButtonComponent,
    GenreSelectComponent,
    CountrySelectComponent,
    ClapprComponent,
    FocusDirective,
    StationTableComponent,
    GenreTableComponent,
    GenreListComponent,
    CountryListComponent,
    CountryTableComponent,
  ]
})
export class SharedModule { }
