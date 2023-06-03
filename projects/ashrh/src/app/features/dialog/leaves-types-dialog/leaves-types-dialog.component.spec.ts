import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesTypesDialogComponent } from './leaves-types-dialog.component';

describe('LeavesTypesDialogComponent', () => {
  let component: LeavesTypesDialogComponent;
  let fixture: ComponentFixture<LeavesTypesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesTypesDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
