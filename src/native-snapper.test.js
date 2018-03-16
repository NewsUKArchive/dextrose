/* global jest describe it expect */
import path from 'path';
import shell from 'shelljs';

import Snapper from './native-snapper';

let mockExec = {
  code: 0,
}
shell.exec = jest.fn(() => mockExec);

describe('snapper', () => {
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

    expect(shell.exec.mock.calls[0]).toEqual([`adb shell screencap -p ${outpath}.${deviceType}.png`]);
  });

  it('snaps ios', async () => {
    const outpath = `${__dirname}-test`;
    const deviceType = 'ios';
    const snapper = new Snapper(deviceType);

    await snapper.snap(outpath);

    expect(shell.exec.mock.calls[1]).toEqual([`xcrun simctl io booted ${outpath}.${deviceType}.png`]);
  });

  it('rejects on non 0 exit code', async () => {
    const outpath = `${__dirname}-test`;
    const deviceType = 'ios';
    const snapper = new Snapper(deviceType);

    mockExec = {
      code: 1,
      stderr: 'err',
    };

    expect(snapper.snap(outpath)).rejects.toBe('err');
  });

  it('throws an exception if path is not string', () => {
    const outpath = [];
    const deviceType = 'android';
    const snapper = new Snapper(deviceType);
    expect(() => snapper.snap(outpath)).toThrow();
  });
});
