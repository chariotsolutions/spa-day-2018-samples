import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Subscription} from 'rxjs';

import {DisplayMessage} from './display-message';
import {ChatMessage, ChatProtocol, ChatRegistrationResponse} from './chat-protocol';

import {environment} from '../../environments/environment';


@Component ({
  selector: 'spa-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageInput') messageInputRef;
  @ViewChild('chatBottom') chatBottomRef: ElementRef;

  connected = false;
  name: string;
  nameInput: string;
  msgInput: string;
  output: DisplayMessage[] = [];
  status = 'Not Connected';

  private webSocket: WebSocketSubject<ChatProtocol>;
  private open = false;
  private subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  openCloseStyle() {
    return `${this.open ? 'open' : 'closed'}`;
  }

  messagesOpenCloseStyle() {
    return `${this.open ? 'messagesOpen' : 'messagesClosed'}`;
  }

  chatToggle() {
    this.open = !this.open;
  }

  ngOnInit() {
  }

  connect() {
    this.name = this.nameInput;
    this.output = [];

    this.webSocket = webSocket(environment.chatUrl);

    this.subscription = this.webSocket.subscribe(msg => {
      if (msg['message']) {
        this.acceptMessage(msg as ChatMessage);
      } else if (msg['messages']) {
        this.acceptRegistrationResponse(msg as ChatRegistrationResponse);
      }
    },
    err => {
        this.showMessage(new DisplayMessage('', 'server disconnected'));
        this.setDisconnected();
        this.status = 'Error: Disconnected';
        console.log('err!', err);
    },
      () => {
        this.showMessage(new DisplayMessage('', 'websocket closed'));
        this.setDisconnected();
      }
    );

    this.webSocket.next({
      name: this.name
    });
  }

  sendMessage() {
    if (this.connected && this.msgInput) {
      const chatMsg: ChatMessage = {
        name: this.name,
        message: this.msgInput
      };
      this.webSocket.next(chatMsg);
      this.msgInput = '';
    }
  }

  ngOnDestroy() {
    this.disconnect();
  }

  private acceptRegistrationResponse(response: ChatRegistrationResponse) {
    response.messages.forEach(message => this.acceptMessage(message));

    this.connected = true;

    // force the template to see the update to this.connected and render the messageInput
    // so that we don't get a null reference when we try to focus it
    this.changeDetector.detectChanges();

    this.messageInputRef.nativeElement.focus();
  }

  private acceptMessage(msg: ChatMessage) {
    this.connected = true;
    this.showMessage(new DisplayMessage(msg.name, msg.message));
  }

  private showMessage(msg: DisplayMessage) {
    this.output.push(msg);
    this.output = this.output.slice(-100);
    this.scrollBottom();
  }

  private scrollBottom() {
    this.chatBottomRef.nativeElement.scrollIntoView();
  }

  private setDisconnected() {
    this.connected = false;
    this.name = undefined;
    this.status = 'Disconnected';
  }

  private disconnect() {
    if (this.subscription) {
      this.webSocket.complete();
      this.subscription.unsubscribe();
      this.subscription = undefined;
      this.setDisconnected();
    }
  }
}
