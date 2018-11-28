import styles from './Chat.module.scss';
import React, { Component, createRef } from 'react';
import ChatIcon from '../../assets/chat.svg';
import cx from 'classnames';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ChatActionCreators } from '../../store/reducer/chatReducer';
import { GlobalState } from '../../store';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatMessage, ChatRegistrationRequest } from '../../domain/chat';

interface StateProps {
    open: boolean;
    name?: string;
    messages: ChatMessage[];
    error?: string;
}

interface DispatchProps {
    register: (payload: ChatRegistrationRequest) => void;
    sendMessage: (message: ChatMessage) => void;
    chatToggle: () => void;
}

type Props = StateProps & DispatchProps;

export class Chat extends Component<Props> {

    private chatBottom = createRef<HTMLDivElement>();

    public componentDidUpdate(prevProps: Props) {
        this.scrollToBottom();
    }

    public scrollToBottom() {
        this.chatBottom.current!.scrollIntoView();
    }

    public handleSubmit: (message: string) => void = (message: string) => {
        if (this.props.name) {
            this.props.sendMessage({ message, name: this.props.name! });
        } else {
            this.props.register({ name: message })
        }
    };

    public render() {
        return (
            <div className={cx(styles.box, { [styles.open]: this.props.open })}>
                <div className={styles.chat}
                     onClick={this.props.chatToggle}>
                    <img src={ChatIcon}/>
                    CHAT
                </div>
                <div className={cx(styles.messages, { [styles.messagesOpen]: this.props.open })}>

                    <div className={styles.scrollableMessages}>
                        {this.props.messages.map((message, index) => {
                            const systemMessage = message.name === 'SPA';
                            const myMessage = message.name === this.props.name;
                            return (
                                <div
                                    className={cx({
                                        [styles.myMessage]: myMessage,
                                        [styles.theirMessage]: !myMessage && !systemMessage,
                                        [styles.systemMessage]: systemMessage,
                                    })}
                                    key={index}
                                >
                                    {!systemMessage &&
                                    <span>{message.name}</span>
                                    }
                                    <div>{message.message}</div>
                                </div>
                            )
                        })}

                        <div ref={this.chatBottom}/>
                    </div>

                    {this.props.open &&
                    <ChatInput
                      handleSubmit={this.handleSubmit}
                      placeholder={!this.props.name ? 'Who are you?' : undefined}
                      submitText={!this.props.name ? 'SUBMIT' : 'POST'}
                      error={this.props.error}
                    />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, GlobalState> = state => ({
    open: state.chat.open,
    name: state.chat.name,
    messages: state.chat.messages,
    error: state.chat.error,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
    register: ChatActionCreators.registrationRequest,
    sendMessage: ChatActionCreators.messageSend,
    chatToggle: ChatActionCreators.toggle,
};

export const ChatContainer = connect<StateProps, DispatchProps, {}, GlobalState>(mapStateToProps, mapDispatchToProps)(Chat);
