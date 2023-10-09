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
import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DialogPayslipFormComponent } from './dialog-payslip-form/dialog-payslip-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selectedFile: File | null = null;
  directoryPath: string;
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
    'actions',
    // 'download',
    // 'downloadBadge',
    // 'regenerateQRCode',
    'downloadPayslip'
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
  id;
  pageSize: number = this.pageSizeOption[2];
  private paramSearch: any = {
    page_size: this.pageSize,
    page: 1
  };
  payslipForm: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private employeeDbService: EmployeeDbService,
    private modalService: NgbModal,
    private notiSelect: NotificationService,
    public serverFormatDatePipe: ServerFormatDatePipe,
    private notiservice: NotificationService,
    private trans: TranslateService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.payslipForm = this.fb.group({
      indemnity: ['', Validators.required],
      performance: ['', Validators.required],
      rfs: ['', Validators.required],
      acompte: ['', Validators.required],
      internal_number: [null, Validators.required],
      cat_ech: [null, Validators.required],
      insured_number: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.query(this.paramSearch); //query renvoie les elements qui se trouve a un numero de page et un nombre d'element a recupere contenu dans paramSearch
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onFileSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data'
        })
      };
      const request = new HttpRequest(
        'POST',
        environment.server +
          '/api/grh/import_employee_data/' +
          this.selectedFile.name +
          '/',
        formData
      );

      // Send the JSON data as a POST request
      this.http.request(request).subscribe(
        (response) => {
          this.notiservice.success(
            this.trans.instant('Fichier importé avec succès')
          );
          console.log('File uploaded successfully:', response);
          // Optionally, display a success message to the user
        },
        (error) => {
          console.error('Error while uploading file:', error);
          // Display an error message to the user
        }
      );
    }
  }

  exportFile() {
    this.employeeDbService.exportFile().subscribe((xlsx: any) => {
      const blob = new Blob([xlsx], { type: 'application/xlsx' });
      const fileName = 'document.xlsx';
      saveAs(blob, fileName);
    });
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
    console.log('element when i check', element);
    this.employeeDbService
      .updateEmployee(element.id, { activate: element.activate })
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
    console.log('this.paramSearch[param] = val;', this.paramSearch);
    this.query(this.paramSearch);
  }
  queryByPassFactory(params: string[], val: any) {
    // console.log('')
    for (const param of params) {
      this.paramSearch[param] = val;
    }
    this.query(this.paramSearch);
  }

  private query(params) {
    console.log('that is params of query function', params);
    this.employeeDbService
      .queryEmployees(params)
      .pipe(take(1))
      .subscribe((emp: any) => {
        console.log('these are the employees: :( ):', emp);
        // console.log(emp);
        this.dataSource = emp?.results.map((elt) => ({
          ...elt,
          select: false
        }));

        this.lengh = emp.total;
        console.log('that is total', emp);
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

  public activateAll() {
    //  console.log('this.dataSource',this.dataSource);

    this.dataSource.map((elt) => {
      if (elt.select) {
        //  console.log('element',elt.first_name);

        this.employeeDbService
          .updateEmployee(elt.id, { activate: elt.select })
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.notiSelect.success('Activation succefully');
              this.query(this.paramSearch);
            },
            (err) => {}
          );
      }
    });
  }

  public deactivateAll() {
    //  console.log('this.dataSource',this.dataSource);

    this.dataSource.map((elt) => {
      if (elt.select) {
        //  console.log('element',elt.first_name);

        this.employeeDbService
          .updateEmployee(elt.id, { activate: false })
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.notiSelect.success('deactivation succefully');
              this.query(this.paramSearch);
            },
            (err) => {}
          );
      }
    });
  }

  public deleteAll() {
    this.dataSource.map((elt) => {
      if (elt.select) {
        this.employeeDbService
          .deleteEmployee(elt.id)
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.notiSelect.success('Suppression succefully');
              this.query(this.paramSearch);
            },
            (err) => {}
          );
      }
    });
  }

  download(element: any) {
    this.employeeDbService
      .downloadContractEmployee(element.id)
      .subscribe((pdf) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const fileName = 'ContractEmployee.pdf';
        saveAs(blob, fileName);
      });
  }

  downloadBadge(element: any) {
    this.employeeDbService
      .downloadBadgeEmployee(element.id)
      .subscribe((pdf) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const fileName = 'BadgeEmployee.pdf';
        saveAs(blob, fileName);
      });
  }

  downloadPayslip(element: any) {
    console.log('***********************', this.payslipForm);
    const dialogRef = this.dialog.open(DialogPayslipFormComponent, {
      // width: '600px',
      // height: '600px',
      data: this.payslipForm.value
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('RESULT**', result);

      if (result) {
        this.employeeDbService
          .downloadPayslipEmployee(element.id, result)
          .subscribe((pdf) => {
            const blob = new Blob([pdf], { type: 'application/pdf' });
            const fileName = 'PayslipEmployee.pdf';
            saveAs(blob, fileName);
          });
      }
    });
  }

  regenerateQRCode(element: any): void {
    const params = {};

    this.employeeDbService.regenerateQRCode(element.id).subscribe(
      (response) => {
        this.notiservice.success(
          this.trans.instant('QR code regenerated successfully.')
        );
        console.log('QR code regenerated successfully.');
      },
      (error) => {
        console.error('Failed to regenerate QR code:', error);
      }
    );
  }

  private notiSelectBeforeAction() {
    this.notiSelect.info(
      'select at least one employee before applying the action'
    );
  }

  get moreOneSelect() {
    return this.dataSource.every((elt) => !elt.select);
  }
}
