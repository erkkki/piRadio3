import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {
  Codecs,
  Country,
  CountryCode,
  Language,
  States,
  Tag,
  Station,
  Click,
  ClickOK,
  ServerStats,
  VoteResponse, MirrorServer, ServerConfig
} from '../models/radio.api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RadioApiService {

  private protocol = 'https';
  private radioApi = environment.radioApiUrl;
  private defaultLimit = 1000;
  private serverMirrors: MirrorServer[] = [];

  constructor(private http: HttpClient) {}

  get server(): Observable<string> {
    /* TODO return random server */
    return of(this.radioApi);
  }

  private get<T>(url: string, params: object): Observable<T> {
    // @ts-ignore
    let paramsTemp = new HttpParams({ fromObject: params });

    return this.server.pipe(
      switchMap(server => {
        return this.http.get<T>(`${this.protocol}://${server}/${url}`, {params: paramsTemp});
      })
    );
  }

  private post<T>(url: string, params: object): Observable<T> {
    // @ts-ignore
    let paramsTemp = new HttpParams({ fromObject: params });

    return this.server.pipe(
      switchMap(server => {
        return this.http.post<T>(`${this.protocol}://${server}/${url}`, {params: paramsTemp});
      })
    );
  }

  /**
   * List of countries
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getCountries(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<Country[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const params = {...{
      order: 'name',
      reverse: false,
      hidebroken: true,
      offset: 0,
      limit: this.defaultLimit,
    }, ...options?.params};

    return  this.get<Country[]>(`${format}/countries/${filter}`, params);
  }

  /**
   * List of country codes
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getCountryCodes(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<CountryCode[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return  this.get<CountryCode[]>(`${format}/countrycodes/${filter}`, params);
  }

  /**
   * List of codecs
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getCodecs(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<Codecs[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return  this.get<Codecs[]>(`${format}/codecs/${filter}`, params);
  }

  /**
   * List of states
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getStates(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    country?: string;
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<States[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const country = options?.country || '';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    if (country) {
      return  this.get<States[]>(`${format}/states/${country}/${filter}`, params);
    } else {
      return  this.get<States[]>(`${format}/states/${filter}`, params);
    }
  }

  /**
   * List of languages
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getLanguages(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<Language[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return  this.get<Language[]>(`${format}/languages/${filter}`, params);
  }

  /**
   * List of tags
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param options api parameters
   */
  getTags(options?: {
    filter?: string;
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<Tag[]> {
    const filter = options?.filter || '';
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return  this.get<Tag[]>(`${format}/tags/${filter}`, params);
  }

  /**
   * List of radio stations
   * Return http api call observable.
   * Waits until server address observable is done.
   * @param filter search string
   * @param by 'byuuid' | 'byname' | 'bynameexact' | 'bycodec' | 'bycodecexact' | 'bycountry' | 'bycountryexact' |
   *           'bycountrycodeexact' | 'bystate' | 'bystateexact' | 'bylanguage' | 'bylanguageexact' | 'bytag' | 'bytagexact'
   * @param options api parameters
   */
  getStationsBy(filter: string, by: string, options?: {
    format?: 'json' | 'xml';
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return  this.get<Station[]>(`${format}/stations/${by}/${filter}`, params);
  }

  /**
   * List of all radio stations
   * @param options api parameters
   */
  getStations(options?: {
    format?: 'json' | 'xml',
    params?: {
      order?: 'name' | 'clickcount';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }}): Observable<Station[]> {
    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return this.get<Station[]>(`${format}/stations`, params);
  }

  /**
   * List of station clicks
   * @param options api parameters
   */
  getClicks(options?: {
    format?: 'json' | 'xml',
    station?: Station,
    click?: Click
    seconds?: number,
  }): Observable<Click> {
    const format = options?.format || 'json';
    const params = {
      stationuuid: options?.station?.stationuuid || '',
      lastclickuuid: options?.click?.clickuuid || '',
      seconds: options?.seconds || 0,
    };

    return this.get<Click>(`${format}/clicks`, params);
  }

  /**
   * Station click counter
   * @param station Station
   * @param options parameters
   */
  clickStation(station: Station, options?: { format?: 'json' | 'xml'}): Observable<ClickOK> {
    const format = options?.format || 'json';
    const stationuuid = station.stationuuid;

    return this.get<ClickOK>(`${format}/url/${stationuuid}`, {});
  }

  /**
   * Advanced station search
   * @param options parameters
   */
  searchStations(options?: {
    format?: 'json' | 'xml',
    params?: {
      name?: string;
      nameExact?: boolean;
      country?: string;
      countryExact?: boolean;
      countrycode?: string;
      state?: string;
      stateExact?: boolean;
      language?: string;
      languageExact?: boolean;
      tag?: string;
      tagExact?: boolean;
      tagList?: string[];
      codec?: string;
      bitrateMin?: number;
      bitrateMax?: number;
      has_geo_info?: boolean;
      order?: 'name' | 'url' | 'homepage' | 'favicon' | 'tags' | 'country' | 'state' | 'language' | 'votes' | 'codec' | 'bitrate' | 'lastcheckok' | 'lastchecktime' | 'clicktimestamp' | 'clickcount' | 'clicktrend' | 'random';
      reverse?: boolean;
      hidebroken?: boolean;
      offset?: number;
      limit?: number;
    }}): Observable<Station[]> {

    const format = options?.format || 'json';
    const params = {...{
        order: 'name',
        reverse: false,
        hidebroken: true,
        offset: 0,
        limit: this.defaultLimit,
      }, ...options?.params};

    return this.get<Station[]>(`${format}/stations/search`, params);
  }


  /**
   * Search radio stations by UUID
   * @param options parameters
   */
  searchStationsByUuid(options?: {
    format?: string;
    uuids: string;
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const params = {
      uuids: options.uuids
    };
    return this.get<Station[]>(`${format}/stations/byuuid`, params);
  }

  /**
   * Stations by clicks
   * @param options parameters
   */
  searchStationsByClicks(options?: {
    format?: string;
    rowcount?: number;
    params?: {
      offset?: number;
      limit?: number;
      hidebroken: boolean;
    };
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const rowcount = options?.rowcount || this.defaultLimit;
    const params = {...{
        limit: this.defaultLimit,
        hidebroken: true
      }, ...options?.params};
    return this.get<Station[]>(`${format}/stations/topclick/${rowcount}`, params);
  }

  /**
   * Stations by votes
   * @param options parameters
   */
  searchStationsByVotes(options?: {
    format?: string;
    rowcount?: number;
    params?: {
      offset?: number;
      limit?: number;
      hidebroken: boolean;
    };
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const rowcount = options?.rowcount || this.defaultLimit;
    const params = {...{
        limit: this.defaultLimit,
        hidebroken: true
      }, ...options?.params};
    return this.get<Station[]>(`${format}/stations/topvote/${rowcount}`, params);
  }

  /**
   * Stations by recent click
   * @param options parameters
   */
  searchStationsByRecentClick(options?: {
    format?: string;
    rowcount?: number;
    params?: {
      offset?: number;
      limit?: number;
      hidebroken: boolean;
    };
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const rowcount = options?.rowcount || this.defaultLimit;
    const params = {...{
        limit: this.defaultLimit,
        hidebroken: true
      }, ...options?.params};
    return this.get<Station[]>(`${format}/stations/lastclick/${rowcount}`, params);
  }

  /**
   * Stations by recently changed/added
   * @param options parameters
   */
  searchStationsByLastchange(options?: {
    format?: string;
    rowcount?: number;
    params?: {
      offset?: number;
      limit?: number;
      hidebroken: boolean;
    };
  }): Observable<Station[]> {
    const format = options?.format || 'json';
    const rowcount = options?.rowcount || this.defaultLimit;
    const params = {...{
        limit: this.defaultLimit,
        hidebroken: true
      }, ...options?.params};
    return this.get<Station[]>(`${format}/stations/lastchange/${rowcount}`, params);
  }

  /**
   * Vote for station
   */
  voteStation(station: Station, options?: {format?: 'json' | 'xml'}): Observable<VoteResponse> {
    const format = options?.format || 'json';
    return this.get<VoteResponse>(`${format}/vote/${station.stationuuid}`, {});
  }

  /**
   * Get server stats
   */
  getServerStats(options?: {format?: 'json' | 'xml'}): Observable<ServerStats> {
    const format = options?.format || 'json';
    return this.get<ServerStats>(`${format}/stats`, {});
  }

  /**
   * Get server mirrors list
   */
  getServers(options?: {format?: 'json' | 'xml'}): Observable<MirrorServer[]> {
    const format = options?.format || 'json';
    return this.get<MirrorServer[]>(`${format}/servers`, {});
  }

  /**
   * Get server config
   */
  getServerConfig(options?: {format?: 'json' | 'xml'}): Observable<ServerConfig> {
    const format = options?.format || 'json';
    return this.get<ServerConfig>(`${format}/config`, {});
  }

}
