/* global jest describe it expect */
import path from 'path';
import { execSync } from 'child_process';

import Snapper from './native-snapper';

jest.mock('child_process');

describe('snapper', () => {
  const osnap = path.join(__dirname, '../node_modules/.bin/osnap');

  it('sets the platform', () => {
    const platform = 'android';
    const snapper = new Snapper(platform);
    expect(snapper.platform).toMatch(platform);
  });

  it('snaps android', async () => {
    const outpath = `${__dirname}-test`;
    const deviceType = 'android';
    const snapper = new Snapper(deviceType);

    await snapper.snap(outpath);

    expect(execSync.mock.calls[0]).toEqual([
      `${osnap} ${deviceType} -f ${outpath}.${deviceType}.png`,
    ]);
  });

  it('snaps ios', async () => {
    const outpath = `${__dirname}-test`;
    const deviceType = 'ios';
    const snapper = new Snapper(deviceType);

    await snapper.snap(outpath);

    expect(execSync.mock.calls[1]).toEqual([
      `${osnap} ${deviceType} -f ${outpath}.${deviceType}.png`,
    ]);
  });

  it('throws an exception if path is not string', () => {
    const outpath = [];
    const deviceType = 'android';
    const snapper = new Snapper(deviceType);
    expect(() => snapper.snap(outpath)).toThrow();
  });
});
