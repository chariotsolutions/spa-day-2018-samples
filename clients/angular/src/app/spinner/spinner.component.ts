import {Component} from '@angular/core';

@Component({
  selector: 'spa-spinner',
  template: `
    <div class="wrapper">
      <img class="spinner" src="../../assets/head.png"/>
    </div>
  `,
  styleUrls: [`spinner.scss`]
})
export class SpinnerComponent {
}
