const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

try {
	const json = yaml.load(fs.readFileSync(path.resolve(__dirname, '../syntaxes-yaml/sas.tmLanguage.yaml'), 'utf8'));
	fs.writeFileSync(path.resolve(__dirname, '../syntaxes/sas.tmLanguage.json'), JSON.stringify(json, null, "\t"));
	console.log('yaml to json at ' + Date().toString());
} catch(e) {
	console.log('yaml to json failed:' + e.toString());
}