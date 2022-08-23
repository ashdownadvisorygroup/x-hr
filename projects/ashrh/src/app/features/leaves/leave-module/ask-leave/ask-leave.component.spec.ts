import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLeaveComponent } from './ask-leave.component';

describe('AskLeaveComponent', () => {
  let component: AskLeaveComponent;
  let fixture: ComponentFixture<AskLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AskLeaveComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
