import {Pipe, PipeTransform} from '@angular/core';
import * as format from 'date-fns/format';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {

  static FORMAT = 'h:mm a';

  transform(value: any, args?: any): any {
    return format(value, ShortTimePipe.FORMAT);
  }
}
