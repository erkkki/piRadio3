import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Station} from '../models/station.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  // api_favourite_stations_get_collection    GET      ANY      ANY    /api/favourite_stations.{_format}
  // api_favourite_stations_post_collection   POST     ANY      ANY    /api/favourite_stations.{_format}
  // api_favourite_stations_get_item          GET      ANY      ANY    /api/favourite_stations/{id}.{_format}
  // api_favourite_stations_delete_item       DELETE   ANY      ANY    /api/favourite_stations/{id}.{_format}

  private apiUrl = environment.apiUrl;
  private stations: BehaviorSubject<Station[]>;

  constructor(private http: HttpClient) {
    this.stations = new BehaviorSubject<Station[]>([]);
  }

  getStations(): Station[] {
    return this.stations.getValue();
  }

  addStation(newStation: Station): void {
    let array = this.stations.getValue();
    array.push(newStation);
    this.stations.next(array);
  }

  removeStation(station: Station): void {
    let stations = this.stations.getValue().filter(value => {
      return value.stationuuid !== station.stationuuid;
    });
    this.stations.next(stations);
  }

  getFavourites(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/favourite_stations.json', {withCredentials: true});
  }

  save(station: Station): Observable<any> {
    const favStation = {
      name: station.name,
      stationuuid: station.stationuuid,
    };
    return this.http.post(this.apiUrl + '/api/favourite_stations.json', favStation, {withCredentials: true});
  }

  // TODO
  delete(station: Station): void {
    return;
  }
}
