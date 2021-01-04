import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { HeaderComponent } from './header/header.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { MinPipe } from './pipes/min.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    PlayButtonComponent,
    MinPipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    PlayButtonComponent,
    MinPipe,
  ]
})
export class SharedModule { }
