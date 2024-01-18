const fs = require('fs');
const path = require('path');
const data = require('./translationTemplate_en.json');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writeContentToFile(filePath, content) {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, content);
}

function createTsFile(dir, obj) {
  const currDir = path.join(__dirname, dir);

  if (typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0) {
    for (const key in obj) {
      const subDir = path.join(dir, key);
      const subObj = obj[key];

      if (typeof subObj === 'object' && subObj !== null && !Array.isArray(subObj) && Object.keys(subObj).length > 0) {
        // If the value is an object with keys, recursively create files/directories
        createTsFile(subDir, subObj);
      } else {
        // If the value is not an object or it's an empty object, write it directly to a file
        const content = 'export default ' + JSON.stringify(obj, null, 2) + ';\n';
        const filePath = currDir + '.ts';
        writeContentToFile(filePath, content);
        break; // We have written the entire object to a file, so there is no need to process the remaining keys
      }
    }
  } else {
    // If the current object is not an object or it's an empty object, write it directly to a file
    const content = 'export default ' + JSON.stringify({ [dir]: obj }, null, 2) + ';\n';
    const filePath = currDir + '.ts';
    writeContentToFile(filePath, content);
  }
}

createTsFile('screen', data.screen);
createTsFile('asset', data.asset);
createTsFile('activity', data.activity);
createTsFile('common', data.common);
createTsFile('dapp', data.dapp);
createTsFile('swap', data.swap);
