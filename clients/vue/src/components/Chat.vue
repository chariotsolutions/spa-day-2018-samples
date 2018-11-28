<template>
  <div class="box" v-bind:class="openCloseStyle()">
    <div class="chat" @click="chatToggle()"><img src="../assets/chat.svg"/>CHAT</div>
    <div class="messages" v-bind:class="messagesOpenCloseStyle()">
      <div class="scrollableMessages">
        <div v-for="(msg, index) of messages"
             :key="index"
             v-bind:class="msg.name === name ? 'myMessage' : 'theirMessage'"
        >
          {{msg.name}}: {{msg.message}}
        </div>
        <div class="chatBottom" style="min-height:80px; height:80px;"></div>
      </div>
      <div class="form" v-if="connected">
        <input
            type='text'
            v-model="message"
            placeholder="Message"
            @keydown.enter="sendMessage()"
        />
        <input type='button' value='POST' @click="sendMessage()" :disabled="!message">
      </div>
      <div class="loginForm" v-if="!connected">
        <div class="form">
          <input
              type='text'
              v-model="name"
              placeholder="Name"
              @keydown.enter="connect()"
          />
          <input type='button' value='CONNECT' @click="connect()" :disabled="!name">
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  import { webSocket } from 'rxjs/webSocket';

  export default {

    data: function() {
      return {
        connected: false,
        open: false,
        name: undefined,
        message: undefined,
        messages: [],
        status: 'Not Connected'
      };
    },
    methods: {
      messagesOpenCloseStyle: function() {
        return this.open ? 'messagesOpen' : 'messagesClosed';
      },
      chatToggle: function() {
        this.open = !this.open;
      },
      openCloseStyle: function() {
        return this.open ? 'open' : 'close';
      },
      sendMessage: function() {
         this.webSocket.next({
           name: this.name,
           message: this.message
         });
         this.message = undefined;
      },
      connect: function() {
        this.webSocket = webSocket('ws://localhost:8080/spaday/chat');

        this.webSocketSubscription = this.webSocket.subscribe(
          msg => {
            if ((msg['message'])) {
              this.messages = [msg, ...this.messages.slice(-100)]
            } else if (msg['messages']) {
              this.connected = true;
              // grab our initial messages, render them
              this.messages = [... msg['messages']].slice(-100);
            }
          },
          err => {
            alert('chat disconnected', JSON.stringify(err));
          },
          () => {
            this.connected = false;
            console.log('Connection closed.')
          }
        );
        console.log('message to send to server: ', this.name);
        this.webSocket.next({
          name: this.name
        })
      },
      disconnect: function() {
        this.webSocket.complete();
        this.subscription.unsubscribe();
        this.connected = false;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .box {
    width: 100%;
    bottom: 0;
    background: $color-white;

    @include breakpoint(phablet) {
      transition: width .5s ease;
      position: fixed;
      width: 180px;
      right: 18%;
    }

    &.open {
      @include breakpoint(phablet) {
        width: 500px;
        right: 18%;
      }
    }
  }

  .chat {
    height: 90px;
    min-height: 90px;
    padding-right: 25px;

    background: $color-green;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    color: $color-white;
    font-size: 26px;
    cursor: pointer;

    img {
      padding-right: 10px;
    }
  }

  @mixin message {
    height: 50px;
    line-height: 50px;
    border-radius: 6px;
    margin: 10px 20px;
    padding: 0 10px;
  }

  .theirMessage {
    @include message;
    background-color: #EEEEEE;
    align-self: flex-start;
  }

  .myMessage {
    @include message;
    background-color: #BED5F3;
    align-self: flex-end;
  }

  .messages {
    transition: height .5s ease;
    height: 0;
    border-left: 1px solid $color-border;
    border-right: 1px solid $color-border;
    display: flex;
    flex-direction: column;

    &.messagesOpen {
      height: 310px;
      padding-top: 10px;
    }

    .scrollableMessages {
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }

  .form {
    display: flex;
    margin: auto 20px 10px;
    min-height: 50px;

    input[type=text] {
      font-size: 16px;
      color: $color-text;
      height: 50px;
      padding: 0 10px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border: 1px solid $color-border;
      border-right: 1px solid transparent;
      box-sizing: border-box;
      flex-grow: 1;

      &:focus {
        outline: none;
      }
    }

    input[type=button] {
      font-size: 16px;
      box-sizing: border-box;
      height: 50px;
      width: 100px;
      color: $color-white;
      background: $color-green;
      border: 1px solid $color-green;
      border-radius: 0 6px 6px 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: auto;
        background: $color-disabled;
        border: 1px solid $color-disabled;
      }
    }
  }

</style>
