import { Injectable } from '@angular/core';
import {ReplaySubject, BehaviorSubject} from 'rxjs';
import {Station} from '../models/station';

const tempStation: Station = {
  bitrate: 0,
  changeuuid: 'dd0d0d51-ee8c-11e8-a471-52543be04c81',
  clickcount: 147,
  clicktimestamp: '2021-01-05 17:18:21',
  clicktrend: -4,
  codec: 'MP3',
  country: 'Bermuda',
  countrycode: 'BM',
  favicon: 'http://drdicksdubshack.com/favicon.ico',
  hls: 0,
  homepage: 'http://drdicksdubshack.com/',
  language: 'english',
  lastchangetime: '2020-01-23 20:40:50',
  lastcheckok: 1,
  lastcheckoktime: '2021-01-05 23:15:16',
  lastchecktime: '2021-01-05 23:15:16',
  lastlocalchecktime: '2021-01-05 00:07:37',
  name: 'Dr. Dick’s Dub Shack',
  state: '',
  stationuuid: 'dd0d0d41-ee8c-11e8-a471-52543be04c81',
  tags: 'roots reggae,dub',
  url: 'http://streamer.radio.co/s0635c8b0d/listen?fbclid=IwAR16t5mC5UFT9Fp8pbWe0dvYn9VEI3FYJTogE5AJtUF3G1dJi38lwLgD9as',
  url_resolved: 'http://streamer.radio.co/s0635c8b0d/listen?fbclid=IwAR16t5mC5UFT9Fp8pbWe0dvYn9VEI3FYJTogE5AJtUF3G1dJi38lwLgD9as',
  votes: 49,
};



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  station: ReplaySubject<Station>;
  volume: ReplaySubject<number>;
  playState: ReplaySubject<boolean>;

  constructor() {
    this.volume = new ReplaySubject<number>();
    this.volume.next(10);
    this.playState = new ReplaySubject<boolean>();
    this.playState.next(false);
    this.station = new ReplaySubject<Station>();
    this.station.next(tempStation);


    this.station.subscribe(val => {
      console.log(val);
    });

    this.volume.subscribe(val => {
      console.log(val);
    });

    this.playState.subscribe(val => {
      console.log(val);
    });
  }
}
