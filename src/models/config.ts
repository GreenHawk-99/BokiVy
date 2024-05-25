export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  retryAttempts?: number;
  headers?: Record<string, string>;
}

export interface Config {
  apis: {
    yggdrasil: ApiConfig;
  };
}
