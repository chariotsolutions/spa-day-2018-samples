import { combineEpics, Epic, ofType } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { ActionCreators, Actions, ActionType, RegistrationRequest } from '../reducer/spaReducer';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { ApiSession, apiToSession, Session } from '../../domain/session';
import { Registration, registrationToApi } from '../../domain/registration';
import { push } from 'connected-react-router';

/**
 * converts a single ApiSession to an observable of a Session
 * @param apiSession ApiSession a session coming back from the api
 * @returns Observable<Session> merges the response from fetching the associated registrations
 */
const registrationListRequest: (apiSession: ApiSession) => Observable<Session> =
        apiSession => ajax.get(`/api/session/${apiSession.id}/subscriptions`)
            .pipe(
                mergeMap(registrationResponse =>
                    of(apiToSession(apiSession, registrationResponse.response as Registration[])),
                ),
            );

/**
 * converts a list of apiSessions to a list of regular sessions
 * @param apiSessions list of ApiSession coming from the api
 * @returns Observable<Session[]> merges multiple registration responses
 */
const registrationListForkJoin: (apiSessions: ApiSession[]) => Observable<Session[]> =
        apiSessions => forkJoin(apiSessions.map(
            apiSession => registrationListRequest(apiSession),
        ))

/**
 * fetches a schedule, then fetches each session's associated registrant list, and returns the
 * merged data
 * @param action$
 */
const scheduleRequestEpic: Epic<ActionType> = action$ =>
    action$.pipe(
        ofType(Actions.SCHEDULE_REQUEST),
        mergeMap(() => ajax.get('/api/session', { 'Content-Type': 'application/json' })
            .pipe(
                mergeMap((scheduleResponse: AjaxResponse) =>
                    registrationListForkJoin(scheduleResponse.response as ApiSession[])
                        .pipe(
                            delay(1000),
                            map((mergedSessions: Session[]) => ActionCreators.scheduleSuccess(mergedSessions)),
                        ),
                ),
            ),
        ),
        catchError(e => of(ActionCreators.requestError(e))),
    );

/**
 * registers an attendee to a session
 * @param action$
 */
const registrationRequestEpic: Epic<ActionType, any> =
        action$ => action$.pipe(
            ofType(Actions.REGISTRATION_REQUEST),
            mergeMap((action) => {
                const registrationRequest = action as RegistrationRequest;
                return ajax.post(
                    `/api/session/${registrationRequest.payload.sessionId}/subscribe`,
                    registrationToApi(registrationRequest.payload),
                    { 'Content-Type': 'application/json' },
                ).pipe(
                    mergeMap(() =>
                        [
                            ActionCreators.registrationSuccess(),
                            ActionCreators.scheduleRequest(),
                            push(
                            `/schedule/${registrationRequest.payload.sessionId}/details`,
                            { registration: registrationRequest.payload },
                            ),
                        ],
                    ),
                );
            }),
            catchError(e => of(ActionCreators.requestError(e))),
);

export const spaEpic = combineEpics(
  scheduleRequestEpic,
  registrationRequestEpic,
);
