const test = require('ava');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const fileExists = imagePath => fs.existsSync(path.join(__dirname, imagePath));

test.before(t => {
  execFileSync(path.join(__dirname, '../run-web.sh'), [], { stdio: 'inherit' });
});

test('dextrose generates a snapshello.ios.png', t => {
  t.true(fileExists('../snaps/snapshello.web.width-500.png'));
});

test('dextrose generates a snapsgoodbye.ios.png', t => {
  t.true(fileExists('../snaps/snapsgoodbye.web.width-500.png'));
});

test('dextrose does not generate a snapsignore.ios.png', t => {
  t.false(fileExists('../snaps/snapsignore.web.width-500.png'));
});
