import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './header/header.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PlayButtonComponent } from './play-button/play-button.component';

@NgModule({
  declarations: [HeaderComponent, PlayButtonComponent],
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
  ]
})
export class SharedModule { }
