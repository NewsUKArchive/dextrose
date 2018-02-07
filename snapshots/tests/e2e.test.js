const test = require('ava')
const { execFileSync } = require('child_process');
const path = require('path');
var fs = require('fs');

const fileExists = (imagePath) => fs.existsSync(path.join(__dirname, imagePath));

test.before( t => {
  execFileSync(path.join(__dirname, "../run-ios.sh"), [], {stdio:'inherit'});
});

test('dextrose generates a hello_worlds.ios.png', t => {
  t.true(fileExists('../snaps/hello_worlds.ios.png'));
})

test('dextrose generates a goodbyeWorld.ios.png', t => {
  t.true(fileExists('../snaps/goodbyeWorld.ios.png'));
})

test('dextrose does not generate a IGNORE.ios.png', t => {
  t.false(fileExists('../snaps/IGNORE.ios.png'));
})
