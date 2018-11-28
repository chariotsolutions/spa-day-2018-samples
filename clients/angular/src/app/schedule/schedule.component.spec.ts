import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {ScheduleComponent} from './schedule.component';
import {ScheduleService} from '../shared/schedule.service';
import {Router} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {Observable, of} from 'rxjs';
import {Session} from '../shared/domain/session';

@Injectable()
class MockScheduleService {
  public schedule: Session[] = [
    {
      id: 1,
      name: 'fred',
      date: new Date(),
      registrationCount: 2
    }
  ];

  public getSchedule(): Observable<Session[]> {
    return of(this.schedule);
  }
}

@Injectable()
class MockRouter { navigate = () => {} }

describe('ScheduleComponent', () => {
  let fixture;
  let component: ScheduleComponent;
  const mockScheduleService = new MockScheduleService();
  const mockRouter = new MockRouter();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        ScheduleComponent
      ],
      providers: [
        {provide: ScheduleService, useValue: mockScheduleService},
        {provide: Router, useValue: mockRouter},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should get schedule data on init', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    tick(2000);
    expect(component.schedule).toBe(mockScheduleService.schedule);
  }));

  it('should navigate when bookSession() is called ', async () => {
    const spy = spyOn(mockRouter, 'navigate').and.returnValue(undefined);
    component.bookSession(1);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
