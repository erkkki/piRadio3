import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    /** Own modules */
    HomeRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
