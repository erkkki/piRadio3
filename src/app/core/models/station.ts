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
  votes: number;
  lastchangetime: Date;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: Date;
  lastcheckoktime: Date;
  lastlocalchecktime: Date;
  clicktimestamp: Date;
  clickcount: number;
  clicktrend: number;
}
