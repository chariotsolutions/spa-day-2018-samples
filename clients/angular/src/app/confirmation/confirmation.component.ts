import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {ScheduleService} from '../shared/schedule.service';
import {Registration} from '../shared/domain/registration';
import {Session} from '../shared/domain/session';

import {delay, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'spa-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  registration: Registration;
  sessionRegistrations: Registration[];
  emailParam: string;
  sessionIdParam: number;
  session: Session;
  dataPending = true;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) {
  }

  private getData() {
    this.route.paramMap.pipe(
      delay(2000),
      mergeMap(params => {
          this.extractRouterParams(params);
          return forkJoin(
            this.scheduleService.getSession(this.sessionIdParam),
            this.scheduleService.getRegistrationsForSession(this.sessionIdParam)
          );
        }
      )
    ).subscribe(
      ([session, sessionRegistrations]) => {
        this.session = session;
        this.sessionRegistrations = this.sortRegistrations(sessionRegistrations);
        this.registration = this.sessionRegistrations.find(registration =>
          registration.email === this.emailParam
        );
        this.dataPending = false;
      },
      err => {
        console.log('error', err);
        this.dataPending = false;
      },
      () => {
        this.dataPending = false;
      });
  }

  private extractRouterParams(params: ParamMap): void {
    this.emailParam = params.get('email');
    this.sessionIdParam = Number(params.get('sessionId'));
  }

  private sortRegistrations(unsorted: Registration[]): Registration[] {
    return unsorted.sort((lhs, rhs) => {
      if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) { return -1; }
      if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) { return  1; }
      return 0;
    });
  }

  ngOnInit() {
    this.getData();
  }

}
