import { ActionCreators, initialState, spaReducer, SpaState } from './spaReducer';
import { Session } from '../../domain/session';
import { Registration } from '../../domain/registration';

const testSession: Session = {
    date: new Date(),
    id: 1,
    name: 'foo',
    registrations: [],
};

const testRegistration: Registration = {
    sessionId: 1,
    email: 'bar@bar.com',
    name: 'foo',
    treatment: 'baz',
};

const testSchedule: Session[] = [testSession];

describe('spaReducer', () => {

    it('should ignore irrelevant actions', () => {

        const fooState: SpaState = {
            inFlight: true,
            schedule: testSchedule,
        };

        expect(spaReducer(fooState, { type: 'foo' })).toEqual(fooState);

    });

    it('should set inFlight = true and leave the rest unchanged on all request actions', () => {

        expect(spaReducer(
            {
                inFlight: false,
                schedule: testSchedule,
            },
            ActionCreators.scheduleRequest(),
        ))
          .toEqual(
            {
                inFlight: true,
                schedule: testSchedule,
            },
        );

        expect(spaReducer(
            {
                inFlight: false,
                schedule: testSchedule,
            },
            ActionCreators.registrationRequest(testRegistration),
        ))
          .toEqual(
            {
                inFlight: true,
                schedule: testSchedule,
            },
          );

    });

    it(
      'should set inFlight = false and replace the schedule on schedule success',
      () => {

          const newSession: Session = { ...testSession, name: 'bar' };
          const newSchedule: Session[] = [newSession]

          expect(spaReducer(
              {
                  inFlight: true,
                  schedule: testSchedule,
              },
              ActionCreators.scheduleSuccess(newSchedule)))
          .toEqual(
              {
                  inFlight: false,
                  schedule: newSchedule,
              },
          );

      });

    it('should set inFlight = false and leave state unchanged on registration success', () => {

        expect(spaReducer(
            {
                inFlight: true,
                schedule: testSchedule,
            },
            ActionCreators.registrationSuccess(),
        ))
          .toEqual(
            {
                inFlight: false,
                schedule: testSchedule},
          );

    });

    it('should set back to initial state on init', () => {

        expect(spaReducer(
            {
                inFlight: true,
                schedule: testSchedule,
            },
            ActionCreators.init(),
        ))
          .toEqual(
            {
                ...initialState,
            },
          );
    });
});
