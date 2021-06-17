import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Station} from '../models/radio.api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {



  private apiUrl = environment.apiUrl;
  private stations: BehaviorSubject<Station[]>;

  constructor(private http: HttpClient) {
    this.stations = new BehaviorSubject<Station[]>([]);
  }

  getStations(): Station[] {
    return this.stations.getValue();
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

  apiGetList(options?: { format?: string}): Observable<Station[]> {
    const format = options?.format || 'json';
    return this.http.get<Station[]>(`${this.apiUrl}/api/favourite_stations.${format}`);
  }

  apiAdd(station: Station, options?: { format?: string}): Observable<any> {
    const format = options?.format || 'json';
    return this.http.post<Station>(`${this.apiUrl}/api/favourite_stations.${format}`, station);
  }

  apiGet(station: Station, options?: { format?: string}): Observable<any> {
    const format = options?.format || 'json';
    return this.http.get<Station>(`${this.apiUrl}/api/favourite_stations/${station.stationuuid}.${format}`);
  }

  apiRemove(station: Station, options?: { format?: string}): Observable<any> {
    const format = options?.format || 'json';
    return this.http.delete(`${this.apiUrl}/api/favourite_stations/${station.stationuuid}.${format}`);
  }
}
