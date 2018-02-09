const fs = require("fs");

const dextroseExtension = '.dextrose.tmp.js';

const generateStories = () => {
    return new Promise( resolve => {
        const storyExtensionFilesToFind = ['.stories.js', 'stories.web', 'stories.native'];

        findStoryFiles(storyExtensionFilesToFind)
        .then( storyFiles => {
            const stringToFind = '@storybook/react-native';
            const stringToReplace = 'dextrose/storiesOfOverloader'
            overRideStories(storyFiles, stringToFind, stringToReplace);
            resolve();
        })
        .catch(err => Error(err));
    });
}

const cleanDextroseStories = () => {
    findStoryFiles([dextroseExtension])
        .then( files => {
            files.forEach( file => {
                fs.unlink(`./${file}`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
}

const findStoryFiles = (matchers) =>
    new Promise((resolve, reject) => {
        fs.readdir(__dirname, 'utf8', (err, files) => {
            if (err) reject(err);

            if (!files) {
                reject(`No files found`)
            } else {

                const storyFiles = files.map( file => {

                const isStoryfile =  matchers.some( matcher => file.includes(matcher))
                   if (isStoryfile) {
                        return file;
                    }
                });

                const cleanedStoryFiles = storyFiles.filter( story => story != undefined);

                resolve(cleanedStoryFiles)

            }
        })
    })

const overRideStories = (files, stringToFind, stringToReplace) => {
    return new Promise(resolve => {
        files.forEach(file => {
            fs.readFile(file, "utf8", (err, data) => {
                if (err) {
                    throw err;
                }
                if (data.includes(stringToFind)) {
                    const updatedData = data.replace(stringToFind, stringToReplace);
                    const trimmedFile = file.replace('.js', '');
                    const newFilePath = trimmedFile.concat(dextroseExtension);

                    fs.writeFile(newFilePath, updatedData)
                }
            });
        });
        resolve();
    });
}

module.exports = {
    findStoryFiles,
    overRideStories,
    cleanDextroseStories,
    generateStories
}