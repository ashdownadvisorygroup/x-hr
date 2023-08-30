import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPayslipFormComponent } from './dialog-payslip-form.component';

describe('DialogPayslipFormComponent', () => {
  let component: DialogPayslipFormComponent;
  let fixture: ComponentFixture<DialogPayslipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPayslipFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPayslipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
