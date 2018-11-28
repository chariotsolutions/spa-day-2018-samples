import React, { Fragment } from 'react';
import { Header } from '../Header/Header';
import { ChatContainer } from '../Chat/Chat';
import { Home } from '../Home/Home';

class App extends React.Component {
    public render() {
        return (
            <Fragment>
                <Header/>
                <Home/>
                <ChatContainer/>
            </Fragment>
        );
    }
}

export { App };
