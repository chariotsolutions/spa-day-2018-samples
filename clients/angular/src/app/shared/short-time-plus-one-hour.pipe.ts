import {ShortTimePipe} from './short-time.pipe';
import {Pipe} from '@angular/core';
import * as addHours from 'date-fns/add_hours';

@Pipe({
  name: 'shortTimePlusOneHour'
})
export class ShortTimePlusOneHourPipe extends ShortTimePipe {
  transform(value: any, args?: any): any {
    return super.transform(addHours(value, 1));
  }
}
