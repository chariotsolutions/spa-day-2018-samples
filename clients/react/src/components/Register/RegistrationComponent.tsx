import styles from './Registration.module.scss';
import React, { Component, Fragment } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ActionCreators, SpaState } from '../../store/reducer/spaReducer';
import { Registration } from '../../domain/registration';
import { RouteComponentProps } from 'react-router';
import { Session } from '../../domain/session';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';
import format from 'date-fns/format'
import { addHours } from 'date-fns';

const treatments = ['Aromatherapy', 'Exfoliation', 'Chemical peel', 'Waxing', 'Waning'];

interface RegistrationProps extends RouteComponentProps<{ id: string }> {
    session: Session | undefined;
    inFlight: boolean;
    registrationRequest: (registration: Registration) => void;
}

interface RegistrationState {
    name: string;
    email: string;
    treatment: string;
}

export class RegistrationComponent extends Component<RegistrationProps, RegistrationState> {

    public state = {
        name: '',
        email: '',
        treatment: '',
    };

    public handleChange:
        (field: string) =>
          (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) =>
            void =
        field => (event) => {
            this.setState({ ...this.state, [field]: event.currentTarget.value });
        }

    public handleSubmit: (event: React.SyntheticEvent) => void = (event) => {
        event.preventDefault();
        this.props.registrationRequest({
            ...this.state,
            sessionId: Number(this.props.match.params.id),
        });
    }

    public render() {
        return (
            <Fragment>
                <h3>Register for your appointment:</h3>

                {this.props.inFlight
                    ? <SpinnerComponent/>
                    : <form onSubmit={this.handleSubmit} className={styles.form}>
                        {this.props.session &&
                            <h4>Appointment:&nbsp;
                                <b>
                                    {format(this.props.session.date, 'MMM. Do - h a - ')}
                                    {format(addHours(this.props.session.date, 1), 'h a')}
                                </b>
                            </h4>
                        }

                        <div>
                            <label>Name</label>
                            <input
                                type='text'
                                required={true}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type='text'
                                required={true}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                        </div>
                        <div>
                            <label>Treatment</label>
                            <select required={true}
                                    value={this.state.treatment}
                                    onChange={this.handleChange('treatment')}>
                                <option value='' disabled={true} hidden={true}>
                                    Choose a treatment...
                                </option>
                                {treatments.map(treatment =>
                                    <option
                                        key={treatment}
                                        value={treatment}>
                                        {treatment}
                                    </option>,
                                )}
                            </select>
                        </div>
                        <div><input type='submit' value='Register'/></div>
                    </form>}
            </Fragment>
        );
    }

}

interface StateProps {
    session: Session;
    inFlight: boolean;
}

const mapStateToProps: MapStateToProps<StateProps, RegistrationProps, { spa: SpaState }> =
  (state, ownProps) => ({
      session: state.spa.schedule && state.spa.schedule[ownProps.match.params.id],
      inFlight: state.spa.inFlight,
  });

interface DispatchProps {
    registrationRequest: (registration: Registration) => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, RegistrationProps> = dispatch => ({
    registrationRequest: registration => dispatch(ActionCreators.registrationRequest(registration)),
});

export const RegistrationContainer =
  connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
