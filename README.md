[![Build Status](https://www.bitrise.io/app/6dbd09bf795284e8/status.svg?token=cPPMxR4jerIruWOfSt-_6g&branch=master)](https://www.bitrise.io/app/6dbd09bf795284e8)

# Dextrose


## Purpose

Dextrose cli integrates into developer workflow by providing visual snapshots of react native components described by [storybook] across all react native platforms.

## Implementation

Dextrose extends the [fructose] react native wrapper app by creating a new client.
It's purpose is to iterate through all the bundled components loaded in the app and take a screenshot of each.

Dextrose generates a temporary stories file which reuses your existing components storybook stories. This results in maintainable and seamless integration to your existing workflow.

## Features
- Images of components across native platforms
- Images of components at specified breakpoints across web
- Upload component images to specified s3 Bucket
- Html presentation of images across platforms

## The CLI

 Dextrose supports the following commands:

    run
    generate-stories
    upload
    generate-html
    clean-stories

The Dextrose generate-stories command should be run before the run command in following way:
   
    dextrose generate-stories path/to/your/components/directory

The Dextrose run command can be run with the following commands:

    dextrose run --config, -c -path/to/config

        --config, -c -path/to/config

        --snapshotWait, -t
            Ms to wait between loading a component and taking the snap
        
        --loglevel, -l
            default is set to info, able to set level to verbose


Example config for platforms

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

The Dextrose upload command can be run with the following commands to push component images to s3:

    dextrose upload snapshotDir --bucket bucketname --key commit_hash

        --bucket, -b
            the name of the s3 bucket

        --key, -k
            the name of the key in the bucket

        --region, -r
            the aws region

The Dextrose generate-html command can be run with the following commands to generate component presentation:

    dextrose generate-html --upload --bucket bucketname --key commit-hash

        --upload, -u
            using this will attempt to upload the html file to s3

        --bucket, -b
            the name of the s3 bucket

        --key, -k
            the name of the key in the bucket

        --region, -r
            the aws region

The Dextrose clean-stories command should be run in following way:
   
    dextrose clean-stories path/to/your/components


## Running the example
To run the the example Pull the repo
- Run `yarn` in the Dextrose folder
- Run `yarn` in the snapshots folder (the snapshots folder is an example of how you would consume dextrose)
- Run `./run-(ios | android | web).sh`

note: please make sure you have an (emulator | simulator), and a packager running.

## Future ideas
- Comparison of images
- Specify device orientation


[fructose]: https://github.com/newsuk/fructose
[storybook]: https://github.com/storybooks/storybook