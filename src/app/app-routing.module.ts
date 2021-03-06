import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: 'genres',
    loadChildren: () => import('./genre/genre.module').then(m => m.GenreModule)
  },
  {
    path: 'stations',
    loadChildren: () => import('./stations/stations.module').then(m => m.StationsModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
