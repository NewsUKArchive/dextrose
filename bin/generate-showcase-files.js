const fs = require('fs');
const path = require('path');
const pretty = require('js-object-pretty-print').pretty
const dextroseExtension = '.dextrose.tmp.js';
const showcaseExtensionFilesToFind = '.showcase.js';

const createDextroseTmp = (dirPath, files) =>
  new Promise((resolve, reject) => {
    files.forEach((file) => {
      const showcaseObject = require(path.resolve(dirPath, file)).default
      showcaseObject.children = showcaseObject.children.filter(currentValue => currentValue.type.includes('story')); 
      
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;

        const showcaseComponentImports = data.split('export')[0];
        const indentSpacing = 4;
        const showCaseCompoentObjectString = pretty(showcaseObject, indentSpacing, 'PRINT', true);

        const fileToWrite = `${showcaseComponentImports}export default  ${showCaseCompoentObjectString}`;

        const fileName = file.split('.js')[0];
        dirPath = dirPath.split('lib')[0];
        const newFileName = `${dirPath}/${fileName}${dextroseExtension}`;

        fs.writeFile(newFileName, fileToWrite, (err,) => {
          if (err) throw err
        });

        resolve();
      })    
                
    });
  });

const findShowcaseFiles = dir => 
  new Promise((resolve, reject) => {
    fs.readdir(dir, 'utf8', (err, files) => {
      if (err) reject(err);

      if (!files) {
        reject(Error(`No files in ${dir} found`));
      } else {
        const storyFiles = files.filter(file => {
          if (file.includes(showcaseExtensionFilesToFind)) {
            return file
          }
        });

        resolve(storyFiles);
      }
    });
  });

const generateShowcaseFiles = dir => new Promise((resolve, reject) => {
  findShowcaseFiles(dir)
    .then((showcaseFiles) => {
      createDextroseTmp(dir, showcaseFiles);

      resolve();
    })
    .catch(err => reject(err));
});

module.exports = {
  generateShowcaseFiles
};
