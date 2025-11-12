import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";
import { platform } from "os";

const configPath = resolve(__dirname, "../default.json.template");
const outPath = resolve(__dirname, "../.amazonq/agents/default.json");

// Get node path based on platform
const isWindows = platform() === "win32";
const nodeCommand = isWindows ? "where node" : "which node";
const commandResult = execSync(nodeCommand, { encoding: "utf8" }).trim();
const nodePath = isWindows ? commandResult.split("\n")[0] : commandResult;

// Get project root directory
const projectRoot = resolve(__dirname, "..");

// Read config file
let configContent = readFileSync(configPath, "utf8");

// Replace placeholders (escape backslashes for JSON)
const escapedNodePath = isWindows ? nodePath.replace(/\\/g, "\\\\") : nodePath;
const escapedProjectRoot = isWindows
  ? projectRoot.replace(/\\/g, "\\\\")
  : projectRoot;
configContent = configContent.replace(/path\/to\/node/g, escapedNodePath);
configContent = configContent.replace(
  /path\/to\/base-dir/g,
  escapedProjectRoot,
);

const config = JSON.parse(configContent);

// Write back to file
writeFileSync(outPath, JSON.stringify(config, null, 2));

console.log(`Updated command to: ${nodePath}`);
console.log(`Updated base directory to: ${projectRoot}`);
