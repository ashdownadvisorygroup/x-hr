import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDepartComponent } from './check-depart.component';

describe('CheckDepartComponent', () => {
  let component: CheckDepartComponent;
  let fixture: ComponentFixture<CheckDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
