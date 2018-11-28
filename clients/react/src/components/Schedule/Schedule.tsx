import styles from './Schedule.module.scss';
import React, { Component, Fragment } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Session } from '../../domain/session';
import { ActionCreators, SpaState } from '../../store/reducer/spaReducer';
import { SessionLink } from '../SessionLink/SessionLink';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';

interface ScheduleProps {
    inFlight: boolean;
    schedule?: Session[];
    scheduleRequest: () => void;
}

class ScheduleComponent extends Component<ScheduleProps> {

    public componentDidMount() {
        this.props.scheduleRequest();
    }

    public render() {
        return (
            <Fragment>
                <h3>Choose an appointment time:</h3>

                <div className={styles.schedule}>
                    {(this.props.inFlight || !this.props.schedule)
                        ? <SpinnerComponent />
                        : <Fragment>
                            {Object.values(this.props.schedule).map((session: Session) => (
                                <SessionLink
                                    key={session.id}
                                    {...session}
                                />
                            ))}
                        </Fragment>
                    }
                </div>
            </Fragment>
        );
    }

}

interface StateProps {
    inFlight: boolean;
    schedule?: Session[];
}

const mapStateToProps: MapStateToProps<StateProps, ScheduleProps, { spa: SpaState }> = state => ({
    inFlight: state.spa.inFlight,
    schedule: state.spa.schedule,
});

interface DispatchProps {
    scheduleRequest: () => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, ScheduleProps> = dispatch => ({
    scheduleRequest: () => dispatch(ActionCreators.scheduleRequest()),
});

export const ScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
