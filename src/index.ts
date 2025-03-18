import inquirer from 'inquirer';
import { loadConfig, visitUrls } from './visit';

async function main() {
  const config = await loadConfig();

  const { selectedSite } = await inquirer.prompt({
    type: 'list',
    name: 'selectedSite',
    message: 'Select a site:',
    choices: config.sites.map(site => site.name)
  });

  const site = config.sites.find(s => s.name === selectedSite)!;
  const environments = Object.keys(site.environments);

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['compare', 'visit']
  });

  if (action === 'compare') {
    const { env1 } = await inquirer.prompt({
      type: 'list',
      name: 'env1',
      message: 'Select first environment:',
      choices: environments
    });

    const { env2 } = await inquirer.prompt({
      type: 'list',
      name: 'env2',
      message: 'Select second environment:',
      choices: environments.filter(env => env !== env1)
    });

    console.log('\nComparison URLs and credentials:');
    console.log(`Environment 1: ${site.environments[env1].url}`);
    console.log(`Username: ${site.environments[env1].username}`);
    console.log(`Password: ${site.environments[env1].password}`);
    
    console.log(`\nEnvironment 2: ${site.environments[env2].url}`);
    console.log(`Username: ${site.environments[env2].username}`);
    console.log(`Password: ${site.environments[env2].password}`);

  } else {
    const { env } = await inquirer.prompt({
      type: 'list',
      name: 'env',
      message: 'Select environment to visit:',
      choices: environments
    });

    console.log('\nVisit URL and credentials:');
    console.log(`URL: ${site.environments[env].url}`);
    
    // Add the call to visitUrls
    await visitUrls(env);
  }
}

main().catch(console.error);