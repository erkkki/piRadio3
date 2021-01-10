import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PlayerRoutingModule } from './player-routing.module';
import { TempPlayerComponent } from './temp-player/temp-player.component';
import { VolumeComponent } from './volume/volume.component';
import { PauseComponent } from './pause/pause.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [
    TempPlayerComponent,
    VolumeComponent,
    PauseComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PlayerModule { }
