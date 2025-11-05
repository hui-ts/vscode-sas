const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const yamlPath = path.resolve(__dirname, '../syntaxes-yaml/sas.tmLanguage.yaml');
const jsonPath = path.resolve(__dirname, '../syntaxes/sas.tmLanguage.json');
const tempDir = path.resolve(__dirname, '../temp');
const timeFile = path.join(tempDir, 'yaml-time.txt');

try {
  const yamlMTimeMs = fs.statSync(yamlPath).mtimeMs;

  let lastTimeMs = null;
  if (fs.existsSync(timeFile)) {
    const raw = fs.readFileSync(timeFile, 'utf8').trim();
    const n = Number(raw);
    if (Number.isFinite(n)) lastTimeMs = n;
  }

  if (lastTimeMs !== null && lastTimeMs === yamlMTimeMs) {
    console.log('No change detected in yaml modified time. Skipping yaml to json.');
  } else {
    const json = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
    if (!fs.existsSync(path.dirname(jsonPath))) {
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'), 'utf8');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    fs.writeFileSync(timeFile, String(yamlMTimeMs), 'utf8');

    console.log('yaml to json converted: ' + new Date().toString());
  }
} catch (e) {
  console.log('yaml to json failed: ' + e.toString());
}
