import React from 'react';
import { Route, Switch } from 'react-router';
import { RegistrationContainer } from '../components/Register/RegistrationComponent';
import { SessionDetailsContainer } from '../components/SessionDetails/SessionDetails';
import { ScheduleContainer } from '../components/Schedule/Schedule';

const Routes = () => (
    <Switch>
        <Route exact={true} path='/schedule/:id/register' component={RegistrationContainer}/>
        <Route exact={true} path='/schedule/:id/details' component={SessionDetailsContainer}/>
        <Route exact={false} path='/' component={ScheduleContainer}/>
    </Switch>
);

export { Routes };
