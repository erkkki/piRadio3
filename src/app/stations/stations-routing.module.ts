import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StationComponent} from './station/station.component';
import {StationsSearchComponent} from './stations-search/stations-search.component';

const routes: Routes = [
  {
    path: 'station/:uuid',
    component: StationComponent
  },
  {
    path: 'search',
    component: StationsSearchComponent
  },
  {
    path: 'search/country/:country',
    component: StationsSearchComponent
  },
  {
    path: 'search/genre/:genre',
    component: StationsSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
