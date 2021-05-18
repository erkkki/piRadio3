import { version as angVersion } from 'node_modules/@angular/core/package.json';
import { version as materialVersion } from 'node_modules/@angular/material/package.json';
import { version as clapprVersion } from 'node_modules/clappr/package.json';

export const environment = {
  production: false,
  radioApiUrl: 'https://fr1.api.radio-browser.info/json/servers',
  ga: 'G-NOTAREALGA',

  apiUrl: 'http://localhost:8000',
  loginUrl: 'http://localhost:8000/auth/login',
  logoutUrl: 'http://localhost:8000/auth/logout',

  angular: angVersion,
  material: materialVersion,
  clappr: clapprVersion,
};


