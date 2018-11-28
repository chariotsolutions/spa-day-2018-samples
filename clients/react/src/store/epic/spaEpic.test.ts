import nock from 'nock';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { ActionCreators, initialState, SpaState } from '../reducer/spaReducer';
import { spaEpic } from './spaEpic';
import { Session } from '../../domain/session';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Registration } from '../../domain/registration';

const testRegistration: Registration = {
    sessionId: 1,
    name: 'bar',
    email: 'bar@baz.com',
    treatment: 'baz',
}

const testSession: Session = {
    date: new Date(),
    id: 1,
    name: 'foo',
    registrations: [testRegistration],
};

const testSchedule: Session[] = [testSession]

describe('spaEpic', () => {
    it('maps a schedule request to a success if the api is successful', () => {

        const action$ = ActionsObservable.of(ActionCreators.scheduleRequest());

        const successAction = ActionCreators.scheduleSuccess(testSchedule);

        const stateInput$ = new Subject<{ spa: SpaState }>();
        const state$ = new StateObservable<{ spa: SpaState }>(stateInput$, { spa: initialState });

        nock(/.*/)
          .log(console.log)
          .get('/api/session')
          .reply(200, testSchedule);

        nock(/.*/)
            .log(console.log)
            .get('/api/session/1/subscriptions')
            .reply(200, [testRegistration]);

        return spaEpic(action$, state$, [])
          .pipe(toArray())
          .toPromise()
          .then((actions) => {
              // WHY ?!? the date comes back as a properly formatted date string, but a string nonetheless
              expect(JSON.stringify(actions)).toEqual(JSON.stringify([successAction]));
          });

    });
});
