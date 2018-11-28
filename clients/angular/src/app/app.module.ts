import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule } from './schedule/schedule.module';
import { RegistrationModule } from './registration/registration.module';
import { ConfirmationModule } from './confirmation/confirmation.module';

import {ChatModule} from './chat/chat-module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {WelcomeModule} from './welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WelcomeModule,
    ScheduleModule,
    RegistrationModule,
    ConfirmationModule,
    ChatModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
