import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Station} from '../models/radio.api.interfaces';
import {FavouriteStation} from '../models/api.interfaces';
import {RadioApiService} from './radio-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {



  private apiUrl = environment.apiUrl;
  stations: BehaviorSubject<Station[]>;

  constructor(private http: HttpClient, private radioApi: RadioApiService) {
    this.stations = new BehaviorSubject<Station[]>([]);
  }

  init(): void {
    this.apiGetList().subscribe(data => {
      data.forEach(station => {
        this.loadStationFromApi(station.stationuuid);
      });
    });
  }

  getStations(): Observable<Station[]> {
    return this.stations;
  }

  add(station: Station): void {
    let list = this.stations.getValue();
    let checkDuplicate = list.some(data => data.stationuuid === station.stationuuid);
    if (checkDuplicate) {
      return;
    }
    list.push(station);
    this.stations.next(list);
  }

  remove(station: Station): void {
    let list = this.stations.getValue();
    list = list.filter(data => data.stationuuid !== station.stationuuid);
    this.stations.next(list);
  }

  loadStationFromApi(uuid: string): void {
    this.radioApi.searchStationsByUuid({uuids: uuid}).subscribe(data => {
      this.add(data[0]);
    });
  }

  apiGetList(options?: { format?: string}): Observable<FavouriteStation[]> {
    const format = options?.format || 'json';
    return this.http.get<FavouriteStation[]>(`${this.apiUrl}/api/favourite_stations.${format}`, {withCredentials: true});
  }

  apiAdd(station: Station, options?: { format?: string}): Observable<any> {
    const format = options?.format || 'json';
    return this.http.post<Station>(`${this.apiUrl}/api/favourite_stations.${format}`, station, {withCredentials: true});
  }

  apiRemove(station: Station, options?: { format?: string}): Observable<any> {
    const format = options?.format || 'json';
    return this.http.delete(`${this.apiUrl}/api/favourite_stations/${station.stationuuid}.${format}`, {withCredentials: true});
  }
}
