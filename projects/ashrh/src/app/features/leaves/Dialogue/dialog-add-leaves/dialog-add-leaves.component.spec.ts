import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddLeavesComponent } from './dialog-add-leaves.component';

describe('DialogAddLeavesComponent', () => {
  let component: DialogAddLeavesComponent;
  let fixture: ComponentFixture<DialogAddLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddLeavesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
