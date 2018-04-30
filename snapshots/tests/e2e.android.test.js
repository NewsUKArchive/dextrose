const test = require('ava');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const fileExists = imagePath => fs.existsSync(path.join(__dirname, imagePath));

test.before(t => {
  execFileSync(path.join(__dirname, '../run-android.sh'), [], { stdio: 'inherit' });
});

test('dextrose generates a snapshello.android.png', t => {
  t.true(fileExists('../snaps/snapshello.android.png'));
});

test('dextrose generates a snapsgoodbye.android.png', t => {
  t.true(fileExists('../snaps/snapsgoodbye.android.png'));
});

test('dextrose does not generate a snapsignore.android.png', t => {
  t.false(fileExists('../snaps/snapsignore.android.png'));
});
