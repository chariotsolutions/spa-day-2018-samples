import { webSocket, WebSocketSubject } from 'rxjs/websocket';
import {
    ChatActionCreators,
    ChatActions,
    ChatActionType,
    MessageReceive,
    RegistrationRequest,
} from '../reducer/chatReducer';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ChatError, ChatMessage, ChatProtocol, ChatRegistrationSuccess } from '../../domain/chat';

const socketUrl: string = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/api/chat`;
export const webSocketSubject$: WebSocketSubject<ChatProtocol> = webSocket(socketUrl);

/**
 * upon successful connection, we will immediately start receiving messages,
 * .pipe on the WebSockeSubject makes it 'hot' and tries to connect to the server
 * the server responds to a connection by immediately sending all of the messages individually,
 * so we just start receiving messages here
 * @param action$
 */
const connectEpic: Epic<ChatActionType, ChatActionType> = action$ =>
    action$.pipe(
        ofType(ChatActions.CONNECTION_REQUEST),
        mergeMap(() => webSocketSubject$.pipe(
            map((message: ChatProtocol) => {

                if ('registered' in message) {
                    return ChatActionCreators.registrationSuccess(message as ChatRegistrationSuccess)
                }

                if ('error' in message) {
                    return ChatActionCreators.protocolError((message as ChatError).error)
                }

                return ChatActionCreators.messageReceive(message as ChatMessage)
            }),
        )),
        catchError((e: Error) => of(ChatActionCreators.connectionError(e))),
    );

const registrationEpic: Epic<ChatActionType, ChatActionType> = action$ =>
    action$.pipe(
        ofType(ChatActions.REGISTRATION_REQUEST),
        mergeMap((action: ChatActionType) => {
            const registrationReq = action as RegistrationRequest;
            webSocketSubject$.next(registrationReq.payload);
            return EMPTY
        }),
    );

const messageRequest: Epic<ChatActionType, ChatActionType> = action$ =>
    action$.pipe(
        ofType(ChatActions.MESSAGE_SEND),
        mergeMap((action: ChatActionType) => {
            const registrationReq = action as MessageReceive;
            webSocketSubject$.next(registrationReq.payload);
            return EMPTY
        }),
    );

export const chatEpic = combineEpics(connectEpic, registrationEpic, messageRequest);
