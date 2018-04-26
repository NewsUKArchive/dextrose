const test = require('ava');
const { execFileSync } = require('child_process');
const path = require('path');
var fs = require('fs');

const fileExists = imagePath => fs.existsSync(path.join(__dirname, imagePath));

test.before(t => {
  execFileSync(path.join(__dirname, '../run-ios.sh'), [], { stdio: 'inherit' });
});

test('dextrose generates a snapshello.ios.png', t => {
  t.true(fileExists('../snaps/snapshello.ios.png'));
});

test('dextrose generates a snapsgoodbye.ios.png', t => {
  t.true(fileExists('../snaps/snapsgoodbye.ios.png'));
});

test('dextrose does not generate a snapsignore.ios.png', t => {
  t.false(fileExists('../snaps/snapsignore.ios.png'));
});
