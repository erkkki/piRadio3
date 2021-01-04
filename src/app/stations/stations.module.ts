import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { StationsRoutingModule } from './stations-routing.module';
import { StationsComponent } from './stations/stations.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationComponent } from './station/station.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StationsComponent,
    StationListComponent,
    StationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    StationsRoutingModule,
    SharedModule
  ]
})
export class StationsModule { }
