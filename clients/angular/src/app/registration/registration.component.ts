import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {ScheduleService} from '../shared/schedule.service';
import {Session} from '../shared/domain/session';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.scss',
    '../../../node_modules/font-awesome/scss/font-awesome.scss'
  ]
})
export class RegistrationComponent implements OnInit {
  session: Session;
  formGroup: FormGroup;
  registrationError: string;

  treatments = ['Aromatherapy', 'Exfoliation', 'Chemical peel', 'Waxing', 'Waning'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      treatment: ['', Validators.required]
    });

    this.route.paramMap.pipe(
      mergeMap(params =>
        this.scheduleService.getSession(Number(params.get('sessionId')))
      )).subscribe(
      session => this.session = session,
      err => console.log(err)
    );
  }

  get nameError() {
    let message = '';
    if (!this.formGroup.pristine) {
      const field = this.formGroup.get('name');
      if (field.errors && field.errors['required']) {
        message = 'Name is required';
      }
    }
    return message;
  }

  get emailError() {
    let message = '';
    if (!this.formGroup.pristine) {
      const field = this.formGroup.get('email');
      if (field.errors) {
        if (field.errors['required']) {
          message = 'Email is required';
        } else if (field.errors['email']) {
          message = 'Email is invalid';
        }
      }
    }
    return message;
  }

  get treatmentError() {
    let message = '';
    if (!this.formGroup.pristine) {
      const field = this.formGroup.get('treatment');
      if (field.errors && field.errors['required']) {
        message = 'Treatment selection is required';
      }
    }
    return message;
  }

  register() {
    this.registrationExists().pipe(
      mergeMap(exists => {
        if (exists) {
          return throwError('It looks like you already registered');
        } else {
          return this.createRegistration();
        }
      })
    ).subscribe(
      ok => {
        this.router.navigate(['/confirmation', this.formGroup.value.email, this.session.id]);
      },
      err => {
        this.registrationError = err.toString();
      });
  }

  private registrationExists(): Observable<boolean> {
    return this.scheduleService.registrationExists(this.session.id, this.formGroup.value.email);
  }

  private createRegistration(): Observable<void> {
    return this.scheduleService.addRegistration(
      {
        session: this.session,
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
        treatment: this.formGroup.value.treatment
      }
    );
  }
}
