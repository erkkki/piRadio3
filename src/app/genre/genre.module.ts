import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './genres/genres.component';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

import { GenresRoutingModule } from './genres-routing.module';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    GenresComponent,
    ListComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatInputModule,
    FlexModule,
    MatCardModule,
    RouterModule,
    MatTooltipModule,
    GenresRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule
  ]
})
export class GenreModule { }