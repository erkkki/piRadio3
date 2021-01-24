import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';


import { RadioApiService } from './services/radio-api.service';
import { RadioApiServerService } from './services/radio-api-server.service';
import { PlayerService } from './services/player.service';
import { GenresService } from './services/genres.service';
import { CountriesService } from './services/countries.service';
import {StationHistoryService} from './services/station-history.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [
    RadioApiService,
    RadioApiServerService,
    PlayerService,
    GenresService,
    CountriesService,
    Title,
    StationHistoryService,
  ]
})
export class CoreModule { }
