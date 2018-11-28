import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ConfirmationComponent } from './confirmation.component';
import {SpinnerModule} from '../spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SpinnerModule
  ],
  declarations: [ConfirmationComponent]
})
export class ConfirmationModule { }
