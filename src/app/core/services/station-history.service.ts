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
    let length = 0;

    /** Remove duplicates station from list */
    stations = stations.filter(data => data.stationuuid !== station.stationuuid);

    /** Add to station to list and get length */
    length = stations.push(station);

    /** Remove oldest if over max length */
    if (length > this.maxStationCount) {
      stations = stations.splice(1);
    }

    this.list.next(stations);
    this.saveToLocalStorage(this.list.getValue());
  }

  remove(station: Station): void {
    let list = this.list.getValue();
    list = list.filter(data => data.stationuuid !== station.stationuuid);
    this.list.next(list);
    this.saveToLocalStorage(this.list.getValue());
  }

  loadStationFromApi(uuid: string): void {
    this.radioApi.searchStationsByUuid({uuids: uuid}).subscribe(data => {
      this.add(data[0]);
    });
  }

  saveToLocalStorage(stations: Station[]): string {
    const stationUuidList = stations.map(station => station?.stationuuid);
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
