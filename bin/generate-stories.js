const fs = require('fs');

const dextroseExtension = '.dextrose.tmp.js';

const overRideStories = (dirPath, files, stringToFind, stringToReplace) =>
  new Promise((resolve, reject) => {
    files.forEach((file) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        if (data.includes(stringToFind)) {
          const updatedData = data.replace(stringToFind, stringToReplace);
          const trimmedFile = file.replace('.js', '');
          const newFilePath = trimmedFile.concat(dextroseExtension);
          fs.writeFileSync(`${dirPath}/${newFilePath}`, updatedData);
        }
      });
    });
    resolve();
  });

const findStoryFiles = (dir, matchers) => new Promise((resolve, reject) => {
  fs.readdir(dir, 'utf8', (err, files) => {
    if (err) reject(err);

    if (!files) {
      reject(Error('No files found'));
    } else {
      const storyFiles = files.map((file) => {
        const isStoryFile = matchers.some(matcher => file.includes(matcher));
        if (isStoryFile) {
          return file;
        }

        return undefined;
      });

      const cleanedStoryFiles = storyFiles.filter(story => story !== undefined);
      resolve(cleanedStoryFiles);
    }
  });
});

const generateStories = dir => new Promise((resolve, reject) => {
  const storyExtensionFilesToFind = ['.stories.js', 'stories.web', 'stories.native'];

  findStoryFiles(dir, storyExtensionFilesToFind)
    .then((storyFiles) => {
      const stringToFind = '@storybook/react-native';
      const stringToReplace = 'dextrose/storiesOfOverloader';
      overRideStories(dir, storyFiles, stringToFind, stringToReplace);
      resolve();
    })
    .catch(err => reject(err));
});

const cleanDextroseStories = (dir) => {
  findStoryFiles(dir, [dextroseExtension])
    .then((files) => {
      files.forEach((file) => {
        fs.unlink(`${dir}/${file}`, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    });
};

module.exports = {
  cleanDextroseStories,
  generateStories,
};
