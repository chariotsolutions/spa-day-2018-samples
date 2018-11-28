import {ShortDatePipe} from './short-date.pipe';

describe('ShortDatePipe', () => {
  let pipe: ShortDatePipe;

  beforeEach(() => {
    pipe = new ShortDatePipe();
  });

  it('should properly format the date', () => {
    expect(pipe.transform(new Date(2018, 10, 13)))
      .toBe('November 13th');
  });
});
