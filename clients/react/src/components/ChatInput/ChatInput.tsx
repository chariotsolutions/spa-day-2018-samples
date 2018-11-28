import styles from './ChatInput.module.scss';
import React, { Component } from 'react';
import cx from 'classnames';

interface Props {
    handleSubmit: (message: string) => void;
    placeholder?: string;
    submitText: string;
    error?: string;
}

interface State {
    message: string;
}

export class ChatInput extends Component<Props, State> {

    public state: State = {
        message: '',
    };

    public handleChange: (event: React.SyntheticEvent<HTMLInputElement>) => void =
        event => this.setState({ message: event.currentTarget.value });

    public submit: (event: React.SyntheticEvent) => void = (event) => {
        event.preventDefault();

        const message = this.state.message;
        this.setState({ message: '' }, () =>
            this.props.handleSubmit(message))
    };

    public render() {
        return (
            <form className={cx(styles.form, { [styles.error]: this.props.error })} onSubmit={this.submit}>
                <input
                    type='text'
                    value={this.state.message}
                    placeholder={this.props.error || this.props.placeholder}
                    onChange={this.handleChange}
                />

                <input
                    disabled={!this.state.message}
                    type='submit'
                    value={this.props.submitText}
                />
            </form>
        );
    }
}
