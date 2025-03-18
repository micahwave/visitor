export interface SiteEnvironment {
  url: string;
  username?: string;
  password?: string;
}

export interface Site {
  name: string;
  environments: Record<string, SiteEnvironment>;
  paths: string[];
}

export interface Config {
  sites: Site[];
}
