import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Session} from './domain/session';
import {Registration} from './domain/registration';

import {forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) {
  }

  /*
    Gets the array of Sessions, and then for each session,
    retrieves the list of registrations,
    and updates the session's registration count.

    In a real-world situation, we would just return this all in one call from the back-end
   */
  getSchedule(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.apiUrl}/session`).pipe(
      mergeMap( schedule =>
         forkJoin(schedule.map(session =>
          this.getRegistrationsForSession(session.id).pipe(
            map((registrations) =>
                <Session> {...session, registrationCount: registrations.length}
            )
          )
        ))
      )
    );
  }

  getSession(id: number): Observable<Session> {
     return this.http.get<Session>(`${environment.apiUrl}/session/${id}`);
  }

  addRegistration(registration: Registration): Observable<void> {
    // a bit of hackery required because the server returns a plain string instead of json
    const options = {responseType: 'text' as 'json'};

    return this.http.post<void>(
      `${environment.apiUrl}/session/${registration.session.id}/subscribe`,
      {
        name: registration.name,
        email: registration.email,
        treatment: registration.treatment
      },
      options
    );
  }

  registrationExists(sessionId: number, email: string): Observable<boolean> {
    return this.getRegistrationsForSession(sessionId).pipe(
      map(registrations => registrations.find(existing => existing.email === email) !== undefined)
    );
  }

  getRegistrationsForSession(sessionId: number): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${environment.apiUrl}/session/${sessionId}/subscriptions`);
  }

}
