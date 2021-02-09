import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {PlayerService} from './player.service';
import {Station} from '../models/station';



@Injectable({
  providedIn: 'root'
})
export class StationHistoryService {

  stations$: BehaviorSubject<Station[]>;
  stations: Station[] = [];
  localStorageKey = 'stationHistory';

  constructor(private playerService: PlayerService) {
    this.stations = this.get();
    this.stations$ = new BehaviorSubject<Station[]>(this.stations);

    this.playerService.station.subscribe((newStation) => {
      this.addNew(newStation);
    });
  }

  private addNew(newStation: Station): void {
    if (this.stations) {
      this.stations = this.stations.filter((station) => {
        return (station.stationuuid !== newStation.stationuuid);
      });
    }

    if (newStation.stationuuid === '') {
      return;
    }
    this.stations.push(newStation);

    this.save();
    this.stations$.next([...this.stations].reverse());
  }

  private save(): void {
    if (this.stations.length > 10) {
      this.stations = this.stations.slice(this.stations.length - 10, this.stations.length);
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.stations));
  }

  private get(): Station[] {
    const stations = JSON.parse(localStorage.getItem(this.localStorageKey));
    return (stations) ? stations : [];
  }
}
