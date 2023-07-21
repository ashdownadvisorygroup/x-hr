import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPresenceInfoComponent } from './dialog-presence-info.component';

describe('DialogPresenceInfoComponent', () => {
  let component: DialogPresenceInfoComponent;
  let fixture: ComponentFixture<DialogPresenceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPresenceInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPresenceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
