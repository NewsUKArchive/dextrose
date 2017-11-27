
# Dextrose


## Purpose

Dextrose aims to provide a simple way to get visual snapshots of specified components across all react native devices.

## Concept

Dextrose extends [fructose] by creating a new client. This client has the ability to request the loaded components of a react native app wrapped with Fructose. Once it has the components it cycles through each component and creates an image dump.

What you do with those images is up to you!

## Running the example
To run the the example Pull the repo
- Run `yarn` in the Dextrose folder
- Run `yarn` in the snapshots folder (the snapshots folder is an example of how you would consume dextrose)
- Run `./run-(ios | android | web).sh`

note: please make sure you have an (emulatlor | simulator), (appium | selenium) and a packager running.



[fructose]: https://github.com/newsuk/fructose