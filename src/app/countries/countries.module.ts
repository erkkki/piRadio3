import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

import { CountriesComponent } from './countries/countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    CountriesComponent,
    TableComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    /** Own modules */
    CountriesRoutingModule,
    SharedModule,
  ]
})
export class CountriesModule { }
