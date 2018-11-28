import { Action, ErrorAction, PayloadAction } from './ActionTypes';
import { Reducer } from 'redux';
import { assertNever, serializeError } from '../../util';
import { ChatMessage, ChatRegistrationRequest, ChatRegistrationSuccess } from '../../domain/chat';

// Action strings
export enum ChatActions {
    CONNECTION_REQUEST = 'chat/CONNECTION_REQUEST',
    CONNECTION_ERROR = 'chat/error/CONNECTION',
    PROTOCOL_ERROR = 'chat/error/PROTOCOL',
    REGISTRATION_REQUEST = 'chat/register/REQUEST',
    REGISTRATION_SUCCESS = 'chat/register/SUCCESS',
    MESSAGE_SEND = 'chat/message/SEND',
    MESSAGE_RECEIVE = 'chat/message/RECEIVE',
    TOGGLE = 'chat/TOGGLE',
}

// Action Types
export type Connect = Action<ChatActions.CONNECTION_REQUEST>
export type ConnectionError = ErrorAction<ChatActions.CONNECTION_ERROR>
export type ProtocolError = PayloadAction<ChatActions.PROTOCOL_ERROR, string>
export type RegistrationRequest = PayloadAction<ChatActions.REGISTRATION_REQUEST, ChatRegistrationRequest>
export type RegistrationSuccess = PayloadAction<ChatActions.REGISTRATION_SUCCESS, ChatRegistrationSuccess>
export type MessageSend = PayloadAction<ChatActions.MESSAGE_SEND, ChatMessage>;
export type MessageReceive = PayloadAction<ChatActions.MESSAGE_RECEIVE, ChatMessage>;
export type Toggle = Action<ChatActions.TOGGLE>;

export type ChatActionType = Connect | RegistrationRequest | RegistrationSuccess | ConnectionError |
  ProtocolError | MessageSend | MessageReceive | Toggle;

// Action creators
export const ChatActionCreators = {
    connect(): Connect {
        return { type: ChatActions.CONNECTION_REQUEST }
    },

    connectionError(error: Error): ConnectionError {
        return { error, type: ChatActions.CONNECTION_ERROR }
    },

    protocolError(payload: string): ProtocolError {
        return { payload, type: ChatActions.PROTOCOL_ERROR }
    },

    registrationRequest(payload: ChatRegistrationRequest): RegistrationRequest {
        return { payload, type: ChatActions.REGISTRATION_REQUEST }
    },

    registrationSuccess(payload: ChatRegistrationSuccess): RegistrationSuccess {
        return { payload, type: ChatActions.REGISTRATION_SUCCESS }
    },

    messageSend(payload: ChatMessage): MessageSend {
        return { payload, type: ChatActions.MESSAGE_SEND };
    },

    messageReceive(message: ChatMessage): MessageReceive {
        return { type: ChatActions.MESSAGE_RECEIVE, payload: message };
    },

    toggle(): Toggle {
        return { type: ChatActions.TOGGLE };
    },
};

// State
export interface ChatState {
    readonly open: boolean;
    readonly error?: string;
    readonly name?: string;
    readonly messages: ChatMessage[];
}

export const initialState: ChatState = {
    open: false,
    messages: [],
};

export const chatReducer: Reducer<ChatState, ChatActionType> =
    (state = initialState, action: ChatActionType) => {
        switch (action.type) {
        case ChatActions.CONNECTION_REQUEST:
        case ChatActions.REGISTRATION_REQUEST:
            return {
                ...state,
            };
        case ChatActions.REGISTRATION_SUCCESS:
            return {
                ...state,
                error: undefined,
                name: action.payload.name,
            };
        case ChatActions.MESSAGE_SEND:
            return state;
        case ChatActions.MESSAGE_RECEIVE: {
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        }
        case ChatActions.CONNECTION_ERROR:
            return {
                ...state,
                error: serializeError(action.error),
            };
        case ChatActions.PROTOCOL_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ChatActions.TOGGLE:
            return {
                ...state,
                open: !state.open,
            };
        default:
            assertNever(action);
            return state;
        }
    };
