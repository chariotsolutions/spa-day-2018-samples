import { Reducer } from 'redux';
import { serializeError } from '../../util';
import { Session } from '../../domain/session';
import { Registration } from '../../domain/registration';
import { Action, ErrorAction, PayloadAction } from './ActionTypes';

// Action strings
export enum Actions {
  SCHEDULE_REQUEST = 'spa/schedule/REQUEST',
  SCHEDULE_SUCCESS = 'spa/schedule/SUCCESS',
  REGISTRATION_REQUEST = 'spa/register/REQUEST',
  REGISTRATION_SUCCESS = 'spa/register/SUCCESS',
  REQUEST_ERROR = 'spa/ERROR',
  INIT = 'spa/INIT',
}

// Action Types
export type ScheduleRequest = Action<Actions.SCHEDULE_REQUEST>;
export type ScheduleSuccess = PayloadAction<Actions.SCHEDULE_SUCCESS, Session[]>;

export type RegistrationRequest =
  PayloadAction<Actions.REGISTRATION_REQUEST, Registration>;
export type RegistrationSuccess = Action<Actions.REGISTRATION_SUCCESS>;

export type RequestError = ErrorAction<Actions.REQUEST_ERROR>;
export type Init = Action<Actions.INIT>;

export type ActionType =
  ScheduleRequest | ScheduleSuccess |
  RegistrationRequest | RegistrationSuccess |
  RequestError | Init;

// Action creators
export const ActionCreators = {
    scheduleRequest(): ScheduleRequest {
        return { type: Actions.SCHEDULE_REQUEST };
    },

    scheduleSuccess(payload: Session[]): ScheduleSuccess {
        return { payload, type: Actions.SCHEDULE_SUCCESS };
    },

    registrationRequest(payload: Registration):
      RegistrationRequest {
        return { payload, type: Actions.REGISTRATION_REQUEST };
    },

    registrationSuccess(): RegistrationSuccess {
        return { type: Actions.REGISTRATION_SUCCESS };
    },

    requestError(error: Error): RequestError {
        return { error, type: Actions.REQUEST_ERROR };
    },

    init(): Init {
        return { type: Actions.INIT };
    },
};

// State
export interface SpaState {
    readonly inFlight: boolean;
    readonly error?: string;
    readonly schedule?: Session[];
}

export const initialState: SpaState = {
    inFlight: false,
};

/**
 * the spaReducer handles things related to the overall spa;
 * the schedule, individual sessions, and registering attendees to sessions
 * @param state
 * @param action
 * @constructor
 */
export const spaReducer: Reducer<SpaState> = (state = initialState, action: ActionType) => {
    switch (action.type) {
    case Actions.SCHEDULE_REQUEST:
    case Actions.REGISTRATION_REQUEST:
        return {
            ...state,
            inFlight: true,
        };
    case Actions.SCHEDULE_SUCCESS:
        return {
            inFlight: false,
            schedule: action.payload,
        };
    case Actions.REGISTRATION_SUCCESS:
        return {
            ...state,
            inFlight: false,
        };
    case Actions.REQUEST_ERROR:
        return {
            error: serializeError(action.error),
            ...state,
            inFlight: false,
        };
    case Actions.INIT:
        return { ...initialState };
    default:
        return state;
    }
};
