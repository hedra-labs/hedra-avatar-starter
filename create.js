#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const { execSync } = require('child_process');

async function main() {
  let projectName;
  
  // Check for command line argument
  if (process.argv[2]) {
    projectName = process.argv[2].trim();
  } else {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'hedra-avatar-app',
      validate: name => name ? true : 'Project name cannot be empty',
    });
    projectName = response.projectName.trim();
  }

  const templateDir = path.join(__dirname, 'template');
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    const overwrite = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Directory "${projectName}" already exists. Overwrite?`,
      initial: false,
    });
    if (!overwrite.value) {
      console.log('Aborted.');
      process.exit(1);
    }
    fs.removeSync(targetDir);
  }

  console.log(`\nCreating project in ${targetDir}...`);
  await fs.copy(templateDir, targetDir);

  // After fs.copy(templateDir, targetDir)
  const rootPkg = require(path.join(__dirname, 'package.json'));
  const frontendPkgPath = path.join(targetDir, 'frontend', 'package.json');

  if (fs.existsSync(frontendPkgPath)) {
    const frontendPkg = fs.readJsonSync(frontendPkgPath);
    frontendPkg.name = rootPkg.name;
    frontendPkg.version = rootPkg.version;
    fs.writeJsonSync(frontendPkgPath, frontendPkg, { spaces: 2 });
  }

  // Rename .env.example -> .env
  const envExamplePath = path.join(targetDir, '.env.example');
  const envPath = path.join(targetDir, '.env.local');
  if (fs.existsSync(envExamplePath)) {
    fs.moveSync(envExamplePath, envPath, { overwrite: true });
  }

  // Install dependencies
  console.log('\nInstalling dependencies. This might take a minute...');
  console.log('\nInstalling frontend dependencies...');
  try {
    execSync('pnpm install', { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
  } catch (error) {
    console.error('Error installing frontend (Node) dependencies:');
    console.error(error.message);
    throw error;
  }
  
  console.log('\nInstalling backend dependencies...');
  const backendCtx = { cwd: path.join(targetDir, 'backend'), stdio: 'inherit' }
  try {
    execSync('uv venv --python 3.13', backendCtx);
    execSync('source ./.venv/bin/activate', backendCtx);
    execSync('uv pip install -r requirements.txt', backendCtx);
  } catch (error) {
    console.error('Error installing backend (Python) dependencies:');
    console.error(error.message);
    throw error;
  }

  // Done
  console.log('\n✅ Success! Your Hedra Avatar app is ready.\n');
  console.log(`Next steps:
  cd ${projectName}
  
  To start the frontend: npm run start-app
  To start the backend: npm run start-agent (in a new terminal)

  Your app will be available at http://localhost:3000 once both frontend and backend are running.

  Remember to set your .env.local file with the correct values.
  You can find the relevant .env.example file in the frontend/ and backend/ directories.
`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
