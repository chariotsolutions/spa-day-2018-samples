import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ScheduleService} from '../shared/schedule.service';

import {delay} from 'rxjs/operators';
import {Session} from '../shared/domain/session';

@Component({
  selector: 'spa-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: Session[];

  constructor(private scheduleService: ScheduleService, private router: Router) {
  }

  ngOnInit() {
    this.getSchedule();
  }

  private getSchedule() {
    this.scheduleService.getSchedule().pipe(delay(2000))
      .subscribe(
        schedule => this.schedule = schedule,
        err => console.log('Oops - failed to get schedule', err)
      );
  }

  bookSession(sessionId: number) {
    this.router.navigate(['/registration', sessionId]);
  }
}
