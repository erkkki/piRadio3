import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RadioApiService } from './services/radio-api.service';
import { RadioApiServerService } from './services/radio-api-server.service';
import { PlayerService } from './services/player.service';
import { GenresService } from './services/genres.service';
import { CountriesService } from './services/countries.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    /** TODO remove radio api later. */
    RadioApiService,
    RadioApiServerService,
    PlayerService,
    GenresService,
    CountriesService,
  ]
})
export class CoreModule { }
