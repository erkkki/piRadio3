import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationsComponent } from './stations/stations.component';
import {StationComponent} from './station/station.component';

const routes: Routes = [
  {
    path: '',
    component: StationsComponent
  },
  {
    path: ':uuid',
    component: StationComponent
  },
  {
    path: 'country/:country',
    component: StationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
