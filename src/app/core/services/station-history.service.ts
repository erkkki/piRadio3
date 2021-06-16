import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {RadioApiService} from './radio-api.service';
import {Station} from '../models/radio.api.interfaces';



@Injectable({
  providedIn: 'root'
})
export class StationHistoryService {

  private localStorageKey = 'history';
  private maxStationCount = 10;
  list: BehaviorSubject<Station[]>;

  constructor(private radioApi: RadioApiService) {
    this.list = new BehaviorSubject<Station[]>([]);
    this.init();
  }

  init(): void {
    const stationUuids = this.loadFromLocalStorage();

    stationUuids.forEach(stationUuid => {
      this.loadStationFromApi(stationUuid);
    });
  }

  getStations(): Observable<Station[]> {
    return this.list;
  }

  add(station: Station): void {
    let stations = this.list.getValue();
    const length = stations.push(station);

    if (length > this.maxStationCount) {
      this.remove(stations[0]);
      stations = this.list.getValue();
    }

    this.list.next(stations);
    this.saveToLocalStorage(stations);
  }

  remove(station: Station): void {
    let list = this.list.getValue();
    list = list.filter(data => data.stationuuid !== station.stationuuid);
    this.list.next(list);
    this.saveToLocalStorage(list);
  }

  loadStationFromApi(uuid: string): void {
    this.radioApi.searchStationsByUuid({uuids: uuid}).subscribe(data => {
      this.add(data[0]);
    });
  }

  saveToLocalStorage(stations: Station[]): string {
    const stationUuidList = stations.map(station => station.stationuuid);
    const jsonData = JSON.stringify(stationUuidList);

    localStorage.setItem(this.localStorageKey, jsonData);

    return jsonData;
  }

  loadFromLocalStorage(): string[] {
    const jsonData = localStorage.getItem(this.localStorageKey);
    if (!jsonData) { return []; }
    return JSON.parse(jsonData);
  }
}
