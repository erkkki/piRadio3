import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CountriesComponent } from './countries/countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CountriesComponent,
    CountriesListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class CountriesModule { }
