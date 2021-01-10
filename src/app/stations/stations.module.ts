import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

import { StationsRoutingModule } from './stations-routing.module';
import { StationListComponent } from './station-list/station-list.component';
import { StationComponent } from './station/station.component';
import { SharedModule } from '../shared/shared.module';
import { StationsSearchComponent } from './stations-search/stations-search.component';
import {MatDividerModule} from '@angular/material/divider';




@NgModule({
  declarations: [
    StationListComponent,
    StationComponent,
    StationsSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    /** Own modules */
    StationsRoutingModule,
    SharedModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class StationsModule { }
