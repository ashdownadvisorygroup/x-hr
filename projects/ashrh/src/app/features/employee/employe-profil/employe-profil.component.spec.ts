import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeProfilComponent } from './employe-profil.component';

describe('EmployeProfilComponent', () => {
  let component: EmployeProfilComponent;
  let fixture: ComponentFixture<EmployeProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
