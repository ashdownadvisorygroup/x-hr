import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAttendanceFormComponent } from './dialog-attendance-form.component';

describe('DialogAttendanceFormComponent', () => {
  let component: DialogAttendanceFormComponent;
  let fixture: ComponentFixture<DialogAttendanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAttendanceFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
