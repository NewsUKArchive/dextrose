/* global jest describe beforeEach it expect */
import Snapper from './web-snapper';

jest.mock('fs');

describe('web-snapper', () => {
  let chromeless;
  let config;

  beforeEach(() => {
    chromeless = {
      screenshot: ({filepath}) => {},
      setViewport: () => {},
    };

    config = {
      platformName: 'web',
      breakpoints: [1000],
    };
  });

  it('has the ability to take a screenshot', async () => {
    chromeless.screenshot = jest.fn();
    const webSnapper = new Snapper(config, chromeless);
    await webSnapper.snap('outputDir');
    expect(chromeless.screenshot.mock.calls.length).toBe(1);
  });

  it('throws when snap fails', () => {
    const error = new Error('stop, error time');
    chromeless.screenshot = jest.fn(() => {
      throw error;
    });
    const webSnapper = new Snapper(config, chromeless);
    expect(webSnapper.snap('output')).rejects.toBe(error);
  });

  it('throws an error when path is not a string', async () => {
    const webSnapper = new Snapper(config, chromeless);
    try {
      await webSnapper.snap();
    } catch (err) {
      expect(err.message).toMatch('Output path should be a string recieved');
    }
  });

  it('loops through all specified breakpoints', async () => {
    expect.assertions(1);
    config.breakpoints = [1, 2, 3];
    chromeless.setViewport = jest.fn();
    const webSnapper = new Snapper(config, chromeless);

    await webSnapper.snap('outputDir');
    expect(chromeless.setViewport.mock.calls.length).toBe(3);
  });

  it('rejects when resize fails', () => {
    const error = new Error('stop, error time');
    chromeless.setViewport = jest.fn(() => {
      throw error;
    });
    const webSnapper = new Snapper(config, chromeless);
    expect(webSnapper.snap('output')).rejects.toBe(error);
  });
});
