import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Station} from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  station: ReplaySubject<Station>;

  constructor() {
    this.station = new ReplaySubject<Station>();
    this.station.subscribe(val => {
      console.log(val);
    });
  }
}
