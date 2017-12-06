[![Build Status](https://www.bitrise.io/app/6dbd09bf795284e8/status.svg?token=cPPMxR4jerIruWOfSt-_6g&branch=master)](https://www.bitrise.io/app/6dbd09bf795284e8)

# Dextrose


## Purpose

Dextrose cli aims to provide a simple way to get visual snapshots of specified components across all react native platforms.

## Concept

Dextrose extends [fructose] by creating a new client. This client has the ability to request the loaded components of a react native app wrapped with Fructose. Once it has the components it cycles through each component and creates an image dump.

What you do with those images is up to you!


## The CLI

    dextrose --config ./fructose/dextrose.ios.js

The Dextrose cli can be run with the following commands

    --config, -c ./fructose/dextrose.ios.js

    --timeout, -T
        appium timeout in milliseconds (not applicable to web)

    --snapshotWait, -t
        the amount of time to wait between loading a component and taking the snap
    
    --loglevel, -l
        default is set to info, able to set level to verbose



Example config 

Native

        module.exports = {
            snapPath: path.join(__dirname, '../snaps'),    
            automationName: "XCUITest",
            platformName: "iOS",
            deviceName: "iPhone 7",
            platformVersion: '11.0',
            app: path.join(
                __dirname,
                "../ios/build/Build/Products/Debug-iphonesimulator/snapshots.app"
            ),
            ignoredStories: ["IGNORE"]
        }

Web

        module.exports = {
            snapPath: path.join(__dirname, '../snaps'),
            platformName: "web",
            breakpoints:[500, 1000]
        }

## Running the example
To run the the example Pull the repo
- Run `yarn` in the Dextrose folder
- Run `yarn` in the snapshots folder (the snapshots folder is an example of how you would consume dextrose)
- Run `./run-(ios | android | web).sh`

note: please make sure you have an (emulator | simulator), (appium | selenium) and a packager running.

## Future ideas
- Specify an S3 bucket (or some cloud storage) to dump images
- Presentation of the images
- Comparison of images
- Set web breakpoints

[fructose]: https://github.com/newsuk/fructose