import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TempPlayerComponent } from './temp-player/temp-player.component';

const routes: Routes = [
  {
    path: '',
    component: TempPlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
