import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const configPath = resolve(__dirname, '../default.json.template');
const outPath = resolve(__dirname, '../.amazonq/agents/default.json');

// Get node path from which command
const nodePath = execSync('which node', { encoding: 'utf8' }).trim();

// Get project root directory
const projectRoot = resolve(__dirname, '..');

// Read config file
let configContent = readFileSync(configPath, 'utf8');

// Replace placeholders
configContent = configContent.replace(/path\/to\/node/g, nodePath);
configContent = configContent.replace(/path\/to\/base-dir/g, projectRoot);

const config = JSON.parse(configContent);

// Write back to file
writeFileSync(outPath, JSON.stringify(config, null, 2));

console.log(`Updated command to: ${nodePath}`);
console.log(`Updated base directory to: ${projectRoot}`);