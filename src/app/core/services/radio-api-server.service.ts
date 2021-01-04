import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReplaySubject} from 'rxjs';
import {sample} from 'lodash-es';

import {Server, ServerConfig} from '../models/server';


@Injectable({
  providedIn: 'root'
})
export class RadioApiServerService {
  server = new ReplaySubject<Server>();
  servers: Server[];
  apiUrl = environment.radioApiUrl;

  constructor(private http: HttpClient) {
    this.http.get<Server[]>(this.apiUrl).subscribe((val) => {
      this.servers = val;
      this.server.next(sample(this.servers));
    });
  }
}
