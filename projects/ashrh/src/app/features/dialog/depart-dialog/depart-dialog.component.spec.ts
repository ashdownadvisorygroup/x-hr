import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartDialogComponent } from './depart-dialog.component';

describe('DepartDialogComponent', () => {
  let component: DepartDialogComponent;
  let fixture: ComponentFixture<DepartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
