[![Build Status](https://www.bitrise.io/app/6dbd09bf795284e8/status.svg?token=cPPMxR4jerIruWOfSt-_6g&branch=master)](https://www.bitrise.io/app/6dbd09bf795284e8)

# Dextrose


## Purpose

Dextrose cli aims to provide a simple way to get visual snapshots of specified components across all react native platforms.

## Concept

Dextrose extends [fructose] by creating a new client. This client has the ability to request the loaded components of a react native app wrapped with Fructose. Once it has the components it cycles through each component and creates an image dump.

What you do with those images is up to you!


## The CLI

There are three CLI commands:

    run, upload and generate-html



The Dextrose run command can be run with the following commands:

    dextrose run --config path-to-config

        --config, -c -path-to-config

        --timeout, -T
            appium timeout in milliseconds (not applicable to web)

        --snapshotWait, -t
            the amount of time to wait between loading a component and taking the snap
        
        --loglevel, -l
            default is set to info, able to set level to verbose

The Dextrose upload command can be run with the following commands:

    dextrose upload snapshotDir --bucket bucketname --key commit_hash

        --bucket, -b
            the name of the s3 bucket

        --key, -k
            the name of the key in the bucket

        --region, -r
            the aws region

The Dextrose generate-html command can be run with the following commands:    

    dextrose generate-html --upload --bucket bucketname --key commit-hash

        --upload, -u
            using this will attempt to upload the html file to s3

        --bucket, -b
            the name of the s3 bucket

        --key, -k
            the name of the key in the bucket

        --region, -r
            the aws region
            

Example config 

Native

        module.exports = {
            snapPath: path.join(__dirname, '../snaps'),    
            platformName: "iOS",
            ignoredStories: ["IGNORE"]
        }

Web

        module.exports = {
            snapPath: path.join(__dirname, '../snaps'),
            platformName: "web",
            breakpoints:[500, 1000],
            ignoredStories: ["IGNORE"]
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