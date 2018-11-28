import {Pipe, PipeTransform} from '@angular/core';
import * as format from 'date-fns/format';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  static FORMAT = 'MMMM Do';

  transform(value: any, args?: any): any {
    return format(value, ShortDatePipe.FORMAT);
  }
}
