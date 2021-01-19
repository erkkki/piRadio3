import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

import {Station} from '../models/station';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {RadioApiService} from './radio-api.service';

declare var Clappr: any;

const emptyStation: Station = {
  bitrate: 0,
  changeuuid: '',
  clickcount: 0,
  clicktimestamp: '',
  clicktrend: -4,
  codec: '',
  country: '',
  countrycode: '',
  favicon: '',
  hls: 0,
  homepage: '',
  language: '',
  lastchangetime: '',
  lastcheckok: 0,
  lastcheckoktime: '',
  lastchecktime: '',
  lastlocalchecktime: '',
  name: '',
  state: '',
  stationuuid: '',
  tags: '',
  url: '',
  url_resolved: '',
  votes: 0,
};

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

  station: BehaviorSubject<Station>;
  volume: BehaviorSubject<number>;
  playing: BehaviorSubject<boolean>;
  error: BehaviorSubject<any>;

  public player: any;

  constructor(private radioApiService: RadioApiService) {
    this.volume = new BehaviorSubject<number>(100);
    this.playing = new BehaviorSubject<boolean>(false);
    this.station = new BehaviorSubject<Station>(emptyStation);
    this.error = new BehaviorSubject<any>(null);

    if (!environment.production) {
      this.volume.next(4);
      this.error.subscribe(value => console.log(value));
    }
    this.loadFromLocalStorage();

    this.volume.pipe(
      debounceTime(10),
      distinctUntilChanged()
    ).subscribe(value => this.changeVolume(value));
    this.station.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(value => this.loadPlayBack(value));

  }

  private loadFromLocalStorage(): void {
    const volume: number = JSON.parse(localStorage.getItem('volume'));
    const station: Station = JSON.parse(localStorage.getItem('station'));

    if (volume) {
      this.volume.next(volume);
    }
    if (station) {
      this.station.next(station);
    }
  }

  /**
   *  Clappr component will call this in OnInit
   *  To make sure element is there before trying to load it.
   */
  loadPlayer(): void {
    if (!this.player) {
      this.player = new Clappr.Player({
        source: '',
        parentId: '#player',
        autoPlay: true,
        baseUrl: '/assets',
      });
      this.player.on(Clappr.Events.PLAYER_ERROR , () => this.error.next({type: 'player', msg: 'Error in player.'}));
      this.player.on(Clappr.Events.PLAYBACK_ERROR , () => this.error.next({type: 'playback', msg: 'Error in playback.'}));
      this.player.on(Clappr.Events.CONTAINER_ERROR , () => this.error.next({type: 'container', msg: 'Error in container.'}));
      this.player.on(Clappr.Events.PLAYBACK_PLAY , () => this.playing.next(true));
      this.player.on(Clappr.Events.PLAYBACK_PAUSE , () => this.playing.next(false));
      this.player.on(Clappr.Events.PLAYER_PLAY , () => this.playing.next(true));
      this.player.on(Clappr.Events.PLAYER_PAUSE , () => this.playing.next(false));
    }
    // this.error.next({type: 'player', msg: 'Error in player.'});
  }

  private changeVolume(value: number): void {
    const volume = Math.floor(value);
    if (!this.player) {
      return;
    }
    localStorage.setItem('volume', JSON.stringify(volume));
    this.player.setVolume(volume);
  }

  togglePLaying(): void {
    const playState = this.player.isPlaying();

    if (playState) {
      this.pause();
    } else {
      this.play();
    }
  }

  private play(): void {
    this.player.play();
  }

  private pause(): void {
    this.player.pause();
  }

  private loadPlayBack(station: Station): void {
    if (!this.player) {
      return;
    }
    const url = station.url_resolved;
    // this.player.load(station.url_resolved, 'audio/'+station.codec);
    // this.player.load(station.url_resolved, 'video/mp3');
    this.player.load(station.url_resolved, 'video/mp4');
    this.play();
    localStorage.setItem('station', JSON.stringify(station));
    this.radioApiService.clickStation(station);
  }
}
