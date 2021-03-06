import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeDbService } from '../../core/states/employees/employee-db.service';
import { AppRoutes } from '../../modeles/app-routes';
import { NotificationService } from '../../core/core.module';
import { ServerFormatDatePipe } from '../../core/pipes/server-format-date.pipe';

@Component({
  selector: 'ashrh-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', [style({ display: '*' }), animate(1000)])
    ])
  ]
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('dialogTemplate') dialogTemplate: ElementRef;
  subcription = new Subscription();
  filterExpand = false;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'selection',
    'name',
    'fonction',
    'start_date',
    'contact',
    'status',
    'actions'
  ];
  displayedColumnsFilter: string[] = [
    'selection_filter',
    'name_filter',
    'fonction_filter',
    'start_date_filter',
    'contact_filter',
    'status_filter',
    'actions_filter'
  ];
  new_employee = '../' + AppRoutes.new_employee;
  profil_employee = '../' + AppRoutes.employee_profil;
  // paginator
  pageSizeOption: number[] = [5, 10, 25, 50, 100];
  lengh = 0;
  pageSize: number = this.pageSizeOption[2];
  private paramSearch: any = {
    page_size: this.pageSize,
    page: 1
  };

  constructor(
    private cd: ChangeDetectorRef,
    private employeeDbService: EmployeeDbService,
    private modalService: NgbModal,
    private notiSelect: NotificationService,
    public serverFormatDatePipe: ServerFormatDatePipe
  ) {}

  ngOnInit(): void {
    this.query(this.paramSearch);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  //
  public setPage($event: PageEvent) {
    this.paramSearch.page_size = $event.pageSize;
    this.paramSearch.page = $event.pageIndex + 1;
    this.query(this.paramSearch);
  }

  deleUsers() {
    const emps = this.dataSource
      .filter((elt) => elt.select)
      .map(({ id }) => id);
    if (!emps[0]) {
      this.notiSelectBeforeAction();
      return;
    }
    const modalRef = this.modalService.open(this.dialogTemplate, {
      ariaLabelledBy: 'modal-basic-title'
    });

    modalRef.result.then(
      (result) => {
        this.employeeDbService
          .updateStateEmployees(emps, false)
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.notiSelect.success('Updated succefully');
            },
            (err) => {}
          );
      },
      (reason) => {
        console.warn(reason);
      }
    );
  }
  setUser(element: any) {
    this.employeeDbService
      .updateEmployee(element.id, element)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.notiSelect.success('Updated succefully');
        },
        (err) => {}
      );
  }

  searchChange(event: any) {
    if (event) {
      this.paramSearch.first_name = event;
      this.paramSearch.last_name = event;
      this.paramSearch.email = event;
    } else {
      delete this.paramSearch.first_name;
      delete this.paramSearch.last_name;
      delete this.paramSearch.email;
    }
    this.query(this.paramSearch);
  }

  queryFactory(params: string | string[], val: any) {
    if (typeof params === 'string') {
      params = [params];
    }
    for (const param of params) {
      if (val) {
        this.paramSearch[param] = val;
      } else {
        delete this.paramSearch[param];
      }
    }
    this.query(this.paramSearch);
  }
  queryByPassFactory(params: string[], val: any) {
    for (const param of params) {
      this.paramSearch[param] = val;
    }
    this.query(this.paramSearch);
  }

  private query(params) {
    this.employeeDbService
      .queryEmployees(params)
      .pipe(take(1))
      .subscribe((emp: any) => {
        console.log('these are the employees:');
        console.log(emp);
        this.dataSource = emp?.results.map((elt) => ({
          ...elt,
          select: false
        }));
        this.lengh = emp.total;
        this.cd.detectChanges();
      });
  }

  public watchAll() {
    return this.dataSource.every((elt) => elt.select);
  }
  public checkAll(event) {
    this.dataSource = this.dataSource.map((elt) => ({
      ...elt,
      select: event.checked
    }));
    this.cd.detectChanges();
  }

  open(name: string) {}

  private notiSelectBeforeAction() {
    this.notiSelect.info(
      'select at least one employee before applying the action'
    );
  }

  get moreOneSelect() {
    return this.dataSource.every((elt) => !elt.select);
  }
}
