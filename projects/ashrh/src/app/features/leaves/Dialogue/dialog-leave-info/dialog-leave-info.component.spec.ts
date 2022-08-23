import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeaveInfoComponent } from './dialog-leave-info.component';

describe('DialogLeaveInfoComponent', () => {
  let component: DialogLeaveInfoComponent;
  let fixture: ComponentFixture<DialogLeaveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogLeaveInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
