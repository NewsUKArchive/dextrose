[![Build Status](https://app.bitrise.io/app/6dbd09bf795284e8/status.svg?token=cPPMxR4jerIruWOfSt-_6g)](https://app.bitrise.io/app/6dbd09bf795284e8)

# Dextrose

## Brought to you by The Times Tooling team  🛠

Dextrose is a testing library that enables the screen shots of components across all react-native platforms

This has been made possible using [fructose] to load components.
<p align="center">
  <img src="https://imgur.com/XYNWGol.gif" style="width: 200px;">
</p>

<p align="center">iOS loading in components and taking screenshots</p>


<p align="center">
  <img src="https://media.giphy.com/media/1g37cvjYjJeLpOsfip/giphy.gif" style="width: 200px;">
</p>

<p align="center">Get an overview of your components across devices before you merge using the html report</p>

# Overview


## Implementation

Dextrose's purpose is to iterate through all the bundled components defined by showcases and take a screenshot of each.

The `.showcase` file is a description of how a component should be rendered.
`Showcase` files came around because originally [fructose] consumed `storybook` files. This eventually resulted in numerous issues so we created an abstraction layer which decouples components from storybook.
You can see a working example of how showcase to storybook works here.

[Times-Components-storybook]

[react-native-showcase-loader] can be used to dynamically generate a component file with all your defined components.


## Features
- Images of components across native platforms
- Images of components at specified breakpoints across web
- Upload component images to specified s3 Bucket
- Html presentation of images across platforms

## The CLI

 Dextrose supports the following commands:

    run
    upload
    generate-html

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
            ignoredShowcases: ["IGNORE"]
        }

Web

        module.exports = {
            snapPath: path.join(__dirname, '../snaps'),
            platformName: "web",
            breakpoints:[500, 1000],
            ignoredShowcases: ["IGNORE"]
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
[react-native-showcase-loader]: https://github.com/milesillsley/react-native-showcase-loader
[times-components-storybook]: https://github.com/newsuk/times-components/tree/master/packages/storybook
