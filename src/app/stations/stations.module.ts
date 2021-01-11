import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { StationsRoutingModule } from './stations-routing.module';
import { ListComponent } from './list/list.component';
import { StationComponent } from './station/station.component';
import { SharedModule } from '../shared/shared.module';
import { StationsSearchComponent } from './stations-search/stations-search.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { PlayComponent } from './play/play.component';





@NgModule({
  declarations: [
    ListComponent,
    StationComponent,
    StationsSearchComponent,
    TableComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatToolbarModule,
    /** Own modules */
    StationsRoutingModule,
    SharedModule,
    MatTableModule,
  ]
})
export class StationsModule { }
