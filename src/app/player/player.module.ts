import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PlayerRoutingModule } from './player-routing.module';
import { TempPlayerComponent } from './temp-player/temp-player.component';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';
import { PauseComponent } from './pause/pause.component';
import { InfoComponent } from './info/info.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import { FaviconComponent } from './favicon/favicon.component';
import {MatSliderModule} from '@angular/material/slider';
import { VolumeComponent } from './volume/volume.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
    declarations: [
        TempPlayerComponent,
        VolumeSliderComponent,
        PauseComponent,
        InfoComponent,
        ToolbarComponent,
        FaviconComponent,
        VolumeComponent,
    ],
    exports: [
        ToolbarComponent
    ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatChipsModule,
    MatSliderModule,
    MatTooltipModule,
  ]
})
export class PlayerModule { }
