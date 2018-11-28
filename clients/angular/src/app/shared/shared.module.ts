import {NgModule} from '@angular/core';
import {ScheduleService} from './schedule.service';
import {HttpClientModule} from '@angular/common/http';
import {ShortDatePipe} from './short-date.pipe';
import {ShortTimePipe} from './short-time.pipe';
import {ShortTimePlusOneHourPipe} from './short-time-plus-one-hour.pipe';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    ShortDatePipe,
    ShortTimePipe,
    ShortTimePlusOneHourPipe
  ],
  providers: [
    ScheduleService
  ],
  exports: [
    ShortDatePipe,
    ShortTimePipe,
    ShortTimePlusOneHourPipe
  ]
})
export class SharedModule {
}
