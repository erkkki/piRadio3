import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesListComponent } from './countries-list/countries-list.component';


@NgModule({
  declarations: [CountriesComponent, CountriesListComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
