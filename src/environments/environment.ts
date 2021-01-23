import { version as angVersion } from 'node_modules/@angular/core/package.json';
import { version as materialVersion } from 'node_modules/@angular/material/package.json';
import { version as clapprVersion } from 'node_modules/clappr/package.json';

export const environment = {
  production: false,
  radioApiUrl: 'https://fr1.api.radio-browser.info/json/servers',
  ga: 'G-NOTAREALGA',

  angular: angVersion,
  material: materialVersion,
  clappr: clapprVersion,
};


