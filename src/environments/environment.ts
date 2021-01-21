// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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


