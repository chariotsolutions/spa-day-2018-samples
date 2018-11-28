import {ShortTimePlusOneHourPipe} from './short-time-plus-one-hour.pipe';

describe('ShortTimePlusOneHourPipe', () => {
  let pipe: ShortTimePlusOneHourPipe;

  beforeEach(() => {
    pipe = new ShortTimePlusOneHourPipe();
  });

  it('should properly format the time', () => {
    expect(pipe.transform(new Date(2018, 10, 13, 13, 23)))
      .toBe('2:23 pm');
  });
});
