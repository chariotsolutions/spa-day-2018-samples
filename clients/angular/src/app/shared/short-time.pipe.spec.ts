import {ShortTimePipe} from './short-time.pipe';

describe('ShortTimePipe', () => {
  let pipe: ShortTimePipe;

  beforeEach(() => {
    pipe = new ShortTimePipe();
  });

  it('should properly format the time', () => {
    expect(pipe.transform(new Date(2018, 10, 13, 13, 23)))
      .toBe('1:23 pm');
  });
});
