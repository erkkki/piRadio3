import {Server, ServerConfig} from '../models/server.interface';

/**
 * List of api servers
 * https://fr1.api.radio-browser.info/json/servers
 */
export const serversMock: Server[] = [{
  ip: '2001:19f0:6801:19d7:5400:2ff:fe71:bdb7',
  name: 'fr1.api.radio-browser.info'
}, {
  ip: '2001:19f0:5001:32a4:5400:2ff:fe37:75c2',
  name: 'nl1.api.radio-browser.info'
}, {
  ip: '2a03:4000:37:42:c4fe:4cff:fea7:8941',
  name: 'de1.api.radio-browser.info'
}, {
  ip: '45.77.62.161',
  name: 'fr1.api.radio-browser.info'
}, {
  ip: '95.179.139.106',
  name: 'nl1.api.radio-browser.info'
}, {
  ip: '91.132.145.114',
  name: 'de1.api.radio-browser.info'
}];
