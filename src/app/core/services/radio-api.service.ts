import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


import {RadioApiServerService} from './radio-api-server.service';
import { Server } from '../models/server';
import { Station } from '../models/station';
import {mergeMap} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RadioApiService {

  private server: Server;
  private readonly path: string;

  constructor(private http: HttpClient) {
    this.path = 'http://all.api.radio-browser.info/json';
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.path}/countries`);
  }

  getTags(): Observable<any> {
    return this.http.get(`${this.path}/tags`);
  }

  getStationsBy(by: string, search: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.path}/stations/${by}/${search}`, { params });
  }
}

// getTopStations() {}
// getCountries() {}
// getGenres() {}
// getStationById(station_id) {}
// getStationsByGenre(genre) {}
// getStationsByCountry(country) {}
