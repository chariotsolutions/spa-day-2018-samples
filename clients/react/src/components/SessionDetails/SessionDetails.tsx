import styles from './SessionDetails.module.scss';
import React, { Fragment, StatelessComponent } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Session } from '../../domain/session';
import { connect, MapStateToProps } from 'react-redux';
import { SpaState } from '../../store/reducer/spaReducer';
import { Registration } from '../../domain/registration';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';
import format from 'date-fns/format';
import { addHours } from 'date-fns';

interface SessionProps extends RouteComponentProps<{ id: string }, StaticContext, { registration: Registration }> {
    sessionRequest: (id: number) => void,
    inFlight: boolean,
    session?: Session
}

export const SessionDetails: StatelessComponent<SessionProps> =
    ({ location: { state = { registration: undefined } }, inFlight, session }) => (
        inFlight || !session || !state.registration ? <SpinnerComponent /> :
        <Fragment>
            <div className={styles.sessionDetails}>
                <h2>Success! Your registration is complete</h2>

                <h3>
                    Appointment:&nbsp;
                    <b>
                        {format(session.date, 'MMM. Do - h a - ')}
                        {format(addHours(session.date, 1), 'h a')}
                    </b>
                </h3>
                <h3>Name: <b>{state.registration.name}</b></h3>
                <h3>Email: <b>{state.registration.email}</b></h3>
                <h3>Treatment: <b>{state.registration.treatment}</b></h3>

                <div className={styles.registrationList}>

                    <h2>Complete Registrant List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th><b>Name</b></th>
                                <th><b>Email</b></th>
                                <th><b>Treatment</b></th>
                            </tr>
                        </thead>
                        <tbody>
                        {session.registrations.map((reg, idx) => (
                            <tr key={`reg-${idx}`}>
                                <td>{reg.name}</td>
                                <td>{reg.email}</td>
                                <td>{reg.treatment}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <NavLink className={styles.button} to='/schedule'>Back to Schedule</NavLink>
        </Fragment>
    );

interface StateProps {
    inFlight: boolean;
    session?: Session;
}

const mapStateToProps: MapStateToProps<StateProps, SessionProps, { spa: SpaState }> = (state, ownProps) => ({
    inFlight: state.spa.inFlight,
    session: state.spa.schedule &&
        state.spa.schedule.find(session => session.id === Number(ownProps.match.params.id)),
});

export const SessionDetailsContainer = connect(mapStateToProps)(SessionDetails);
