import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, first, map, retry, switchMap} from 'rxjs/operators';
import {sample} from 'lodash-es';

import {environment} from '../../../environments/environment';
import {Server} from '../models/server.interface';



@Injectable({
  providedIn: 'root'
})
export class RadioApiServerService {

  apiUrl = environment.radioApiUrl;
  servers$: BehaviorSubject<Server[]>;
  server$: BehaviorSubject<Server>;


  constructor(private http: HttpClient) {
    this.servers$ = new BehaviorSubject<Server[]>(null);
    this.server$ = new BehaviorSubject<Server>(null);

    this.http.get<Server[]>(this.apiUrl).pipe(first()).subscribe(servers => {
      this.servers$.next(servers);
      this.server$.next(sample(servers));
      /** If error loading config try to change server couple times */
      this.config.pipe(
        catchError(error => {
          this.server$.next(sample(servers));
          return throwError(error);
        }),
        retry(4),
      ).subscribe(
        val => console.log('Api server is working.'),
        error => console.log('No connection to api server.')
      );
    }, error => console.log('No connection to radio api serves / no internet connection')
    );
  }

  get config(): Observable<any> {
    return this.server$.pipe(
      map(server => server.name),
      switchMap(name => {
        return this.http.get(`https://${name}/json/config`);
      })
    );
  }
}
