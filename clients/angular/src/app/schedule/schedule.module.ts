import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import {SharedModule} from '../shared/shared.module';
import {SpinnerComponent} from '../spinner/spinner.component';
import {SpinnerModule} from '../spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    SpinnerModule
  ],
  declarations: [
    ScheduleComponent
  ]
})
export class ScheduleModule { }
