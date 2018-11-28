import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionCreators, spaReducer, SpaState } from './reducer/spaReducer';
import { ChatActionCreators, chatReducer, ChatState } from './reducer/chatReducer';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { spaEpic } from './epic/spaEpic';
import { chatEpic } from './epic/chatEpic';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export interface GlobalState {
    spa: SpaState;
    chat: ChatState;
    router: RouterState;
}

const devToolsOptions = {
    actionCreators: { ...ActionCreators, ...ChatActionCreators },
}

export const store: Store<GlobalState, AnyAction> = createStore(
    combineReducers({
        spa: spaReducer,
        chat: chatReducer,
        router: connectRouter(history),
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        routerMiddleware(history),
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(spaEpic, chatEpic));

store.dispatch(ChatActionCreators.connect());
