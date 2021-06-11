export interface Server {
  ip: string;
  name: string;
}

export interface ServerConfig {
  check_enabled: boolean;
  prometheus_exporter_enabled: boolean;
  pull_servers: Array<string>;
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
