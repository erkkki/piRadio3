import {ServerConfig} from '../models/server.interface';

/**
 * Server config
 * https://fr1.api.radio-browser.info/json/config
 */
export const serverConfigMock: ServerConfig = {
  check_enabled: true,
  prometheus_exporter_enabled: true,
  pull_servers: ['http://nl1.api.radio-browser.info', 'http://de1.api.radio-browser.info'],
  tcp_timeout_seconds: 10,
  broken_stations_never_working_timeout_seconds: 259200,
  broken_stations_timeout_seconds: 2592000,
  checks_timeout_seconds: 432000,
  click_valid_timeout_seconds: 86400,
  clicks_timeout_seconds: 259200,
  mirror_pull_interval_seconds: 300,
  update_caches_interval_seconds: 300,
  server_name: 'fr1.api.radio-browser.info',
  server_location: 'vultr.com cloud provider',
  server_country_code: 'FR',
  check_retries: 5,
  check_batchsize: 100,
  check_pause_seconds: 60,
  api_threads: 5,
  cache_type: 'redis',
  cache_ttl: 60
};
