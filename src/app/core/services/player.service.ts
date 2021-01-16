import {Injectable} from '@angular/core';

import {ReplaySubject} from 'rxjs';

import {Station} from '../models/station';

declare var Clappr: any;

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
  playing: ReplaySubject<boolean>;

  public player: any;

  constructor() {
    this.volume = new ReplaySubject<number>();
    this.playing = new ReplaySubject<boolean>();
    this.station = new ReplaySubject<Station>();


    this.playing.subscribe(value => {
      if (!this.player) {
        return;
      }
      if (value === true) {
        this.player.pause();
      }
      if (value === false) {
        this.player.play();
      }
    });

    this.volume.subscribe(value => {
      if (!this.player) {
        return;
      }
      this.player.volume = value;
    });

    this.station.subscribe(value => {
      if (!this.player) {
        return;
      }

      const url = value.url_resolved;
      this.player.load(url);
      this.player.play();
    });
  }

  /**
   *  Clappr component will call this in OnInit
   *  To make sure element is there before trying to load it.
   */
  loadPlayer(): void {
    if (!this.player) {
      this.player = new Clappr.Player({source: '', parentId: '#player', autoPlay: true});

      console.log(this.player.getVolume());
      if (this.player.getVolume() === 100) {
        this.player.setVolume(10);
      }
    }
  }
}
