import { chromium } from 'playwright';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Config } from './types/config';

export async function loadConfig(): Promise<Config> {
  const configPath = join(process.cwd(), 'config.json');
  const configData = await readFile(configPath, 'utf-8');
  return JSON.parse(configData) as Config;
}

export async function visitUrls(environment: string) {
  const config = await loadConfig();
  const site = config.sites[0];
  const envConfig = site.environments[environment];

  if (!envConfig) {
    console.log(`Environment ${environment} not found`);
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: envConfig.username || '',
      password: envConfig.password || ''
    }
  });
  const page = await context.newPage();

  // Visit each path
  for (const path of site.paths) {
    const url = `${envConfig.url}${path}`;
    console.log(`Visiting: ${url}`);
    
    try {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      console.log(`Successfully loaded: ${url}`);
    } catch (error) {
      console.error(`Error visiting ${url}:`, error.message);
    }
  }

  await browser.close();
}