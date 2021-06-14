export interface Country {
  name: string;
  stationcount: number;
}

export interface CountryCode {
  name: string;
  stationcount: number;
}

export interface Codecs {
  name: string;
  stationcount: number;
}

export interface States {
  name: string;
  country: string;
  stationcount: number;
}

export interface Language {
  name: string;
  stationcount: number;
}

export interface Tag {
  name: string;
  stationcount: number;
}


export interface Station {
  changeuuid: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  lastchangetime: string;
  lastchangetime_iso8601: string;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: string;
  lastchecktime_iso8601: string;
  lastcheckoktime: string;
  lastcheckoktime_iso8601: string;
  lastlocalchecktime: string;
  lastlocalchecktime_iso8601: string;
  clicktimestamp: string;
  clicktimestamp_iso8601: string;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat: number;
  geo_long: number;
}


export interface Click {
  stationuuid: string;
  clickuuid: string;
  clicktimestamp_iso8601: string;
  clicktimestamp: string;
}

export interface ClickOK {
  ok: boolean;
  message: string;
  stationuuid: string;
  name: string;
  url: string;
}

export interface ServerStats {
  supported_version: number;
  software_version: string;
  status: string;
  stations: number;
  stations_broken: number;
  tags: number;
  clicks_last_hour: number;
  clicks_last_day: number;
  languages: number;
  countries: number;
}

export interface VoteResponse {
  ok: string;
  message: string;
}

export interface MirrorServer {
  ip: string;
  name: string;
}

export interface ServerConfig {
  check_enabled: boolean;
  prometheus_exporter_enabled: boolean;
  pull_servers: string[];
  tcp_timeout_seconds: number;
  broken_stations_never_working_timeout_seconds: number;
  broken_stations_timeout_seconds: number;
  checks_timeout_seconds: number;
  click_valid_timeout_seconds: number;
  clicks_timeout_seconds: number;
  mirror_pull_interval_seconds: number;
  update_caches_interval_seconds: number;
  server_name: string;
  server_location: string;
  server_country_code: string;
  check_retries: number;
  check_batchsize: number;
  check_pause_seconds: number;
  api_threads: number;
  cache_type: string;
  cache_ttl: number;
}

