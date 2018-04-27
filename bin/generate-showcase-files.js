const fs = require('fs');
const path = require('path');
const pretty = require('js-object-pretty-print').pretty
const dextroseExtension = '.dextrose.tmp.js';
const showcaseExtensionFilesToFind = '.showcase.js';


const generateFileData = (dirPath, file, showcaseObject) => 
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);

      const showcaseComponentImports = data.split('export')[0];
      const indentSpacing = 4;
      const showcaseComponentAsString = pretty(showcaseObject, indentSpacing, 'PRINT', true);
      const fileData = `${showcaseComponentImports}export default  ${showcaseComponentAsString}`;
      const fileName = generateFilePathFor(dirPath, file);
      
      resolve({
        fileName,
        fileData
      });
    });
  })

const generateFilePathFor = (dirPath, file) => {
  const fileName = file.split('.js')[0];
  dirPath = dirPath.split('lib')[0];
  return `${dirPath}/${fileName}${dextroseExtension}`;
};

const createDextroseTmpFiles = (dirPath, files) =>
  new Promise((resolve, reject) => {
    files.forEach((file) => {
      const showcaseObject = require(path.resolve(dirPath, file)).default
      showcaseObject.children = showcaseObject.children.filter(currentValue => currentValue.type.includes('story')); 
      
      generateFileData(dirPath, file, showcaseObject)
        .then(({ fileName, fileData }) => {
          fs.writeFile(fileName, fileData, (err) => {
            if (err) reject(err);

            resolve();
          });
        });
    });
  });

const findShowcaseFiles = dir => 
  new Promise((resolve, reject) => {
    fs.readdir(dir, 'utf8', (err, files) => {
      if (err) reject(err);

      if (!files) {
        reject(Error(`No files in ${dir} found`));
      } else {
        const showcaseFiles = files.filter(file => {
          if (file.includes(showcaseExtensionFilesToFind)) {
            return file
          }
        });

        resolve(showcaseFiles);
      }
    });
  });

const generateShowcaseFiles = dir =>
  findShowcaseFiles(dir)
    .then(showcaseFiles => createDextroseTmpFiles(dir, showcaseFiles))

module.exports = generateShowcaseFiles;

