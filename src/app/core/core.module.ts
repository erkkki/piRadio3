import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RadioApiService } from './services/radio-api.service';
import { RadioApiServerService } from './services/radio-api-server.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RadioApiService,
    RadioApiServerService,
  ]
})
export class CoreModule { }
