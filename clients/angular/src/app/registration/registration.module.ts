import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { RegistrationComponent } from './registration.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SpinnerModule,
    AngularFontAwesomeModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
