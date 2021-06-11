/**
 * https://fr1.api.radio-browser.info/json/stats
 */
import {Stats} from '../models/stats.interface';

export const statsMock: Stats = {
  supported_version: 1,
  software_version: '0.7.14',
  status: 'OK',
  stations: 27818,
  stations_broken: 823,
  tags: 7670,
  clicks_last_hour: 3671,
  clicks_last_day: 74338,
  languages: 507,
  countries: 211
};
