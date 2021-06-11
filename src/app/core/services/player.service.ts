import {Injectable} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

import {BehaviorSubject, combineLatest} from 'rxjs';

import {Station} from '../models/station.interface';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {RadioApiService} from './radio-api.service';

declare var Clappr: any;

const emptyStation: Station = {
  bitrate: 0,
  changeuuid: '',
  clickcount: 0,
  clicktimestamp: '',
  clicktrend: 0,
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

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  station: BehaviorSubject<Station>;
  volume: BehaviorSubject<number>;
  playing: BehaviorSubject<boolean>;
  error: BehaviorSubject<any>;

  public player: any;

  constructor(
    private radioApiService: RadioApiService,
    private titleService: Title,
  ) {
    this.volume = new BehaviorSubject<number>(100);
    this.playing = new BehaviorSubject<boolean>(false);
    this.station = new BehaviorSubject<Station>(emptyStation);
    this.error = new BehaviorSubject<any>(null);

    if (!environment.production) {
      this.volume.next(4);
      this.error.subscribe(value => console.log(value));
    }
    this.loadFromLocalStorage();

    /** Events */
    this.onError();
    this.onVolumeChange();
    this.onStationChange();
  }

  private onStationChange(): void {
    this.station.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(value => {
      this.loadPlayBack(value);
      this.titleService.setTitle(value.name);
    });
  }

  private onVolumeChange(): void {
    this.volume.pipe(
      debounceTime(10),
      distinctUntilChanged()
    ).subscribe(value => this.changeVolume(value));
  }

  private onError(): void {
    /**
     * If error & http stream link.
     * Try to change it to https.
     */
    combineLatest([this.station, this.error]).subscribe(value => {
      /** Check if values aren't empty */
      if (!value[1] || !value[0]) {
        return;
      }
      if (value[0].url_resolved.startsWith('http://')) {
        value[0].url_resolved = value[0].url_resolved.replace('http://', 'https://');
        this.station.next(value[0]);
      }
    });

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
        autoPlay: false,
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

    if (station.url_resolved.endsWith('m3u8')) {
      this.player.load(station.url_resolved, 'application/x-mpegURL');
    } else {
      this.player.load(station.url_resolved, 'video/mp4');
    }

    this.play();
    /** Save to localstorage */
    localStorage.setItem('station', JSON.stringify(station));
    /** Click station in api */
    this.radioApiService.clickStation(station);
  }
}
