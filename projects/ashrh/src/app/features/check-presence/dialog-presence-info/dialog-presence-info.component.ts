import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { NotificationService } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeDbService } from '../../../core/states/employees/employee-db.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, take } from 'rxjs/operators';
import { PresenceDbService } from '../../../core/services/presence-db.service';
import { format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';

@Component({
  selector: 'ash-dialog-presence-info',
  templateUrl: './dialog-presence-info.component.html',
  styleUrls: ['./dialog-presence-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPresenceInfoComponent implements OnInit {
  minDate: Date;
  id: any;
  user: any = {};
  employees: any;
  create_presence_req_msg: string;
  submitted = false;
  public has_error = false;
  view = 'day';
  viewDate: Date = new Date();
  // leaveTypes: Observable<any>;
  presenceForm = this.formBuilder.group({
    employee: ['', Validators.required]
  });

  Groupform = new FormGroup({
    presence_date: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    total_hours: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    employee: new FormControl(
      { value: '', disabled: true },
      Validators.required
    )
  });
  // responsibles: any[] = [];
  //url: string = 'http://192.168.33.10:8000/api/grh/responsible/';

  constructor(
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private notiservice: NotificationService,
    private PresenceServiceDB: PresenceDbService,
    private trans: TranslateService,
    private formBuilder: FormBuilder,
    private employeeDbService: EmployeeDbService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    console.log('===============================', this.data);

    const params = {
      params: { date: `${this.data.arrive}` }
    };

    const presenceDetails$ = this.PresenceServiceDB.getPresences(
      this.data.id,
      params
    );
    const employeeDetails$ = this.employeeDbService.getEmployee(this.data.id);
    console.log('DATA+++++++++++++++++++', this.data);

    forkJoin([presenceDetails$, employeeDetails$]).subscribe(
      ([presenceDetails, employeeDetails]) => {
        console.log('+++++++++++++++++++++Presence details:', presenceDetails);
        // console.log('+++++++++++++++++++++Employee details:', employeeDetails);

        const employeeId = employeeDetails['data']['person'];
        const employees = Array.isArray(employeeDetails)
          ? employeeDetails
          : [employeeDetails];
        const employee = employees.find((emp) => emp['id'] === employeeId);

        this.Groupform.patchValue({
          presence_date: presenceDetails['presence_date'],
          total_hours: presenceDetails['presence_hours'],
          employee:
            employeeDetails['data']['person']['first_name'] +
            ' ' +
            employeeDetails['data']['person']['last_name']
        });
      },
      (err) => {}
    );

    // this.activatedRoute.params
    //   .pipe(
    //     take(1),
    //     switchMap(({ employee_id }) => {
    //       const getStart: any = {
    //         month: startOfMonth,
    //         week: startOfWeek,
    //         day: startOfDay
    //       }[this.view];
    //       const date1 = format(getStart(this.viewDate), 'YYYY-MM-DD');
    //       var params = {
    //         params: { start_date: `${date1}` }
    //       };

    //       const presenceDetails$ = this.PresenceServiceDB.getPresences(
    //         this.data.id,
    //         params
    //       );
    //       const employeeDetails$ = this.employeeDbService.getEmployee(
    //         employee_id
    //       );
    //       return forkJoin([presenceDetails$, employeeDetails$]);
    //     })
    //   )
    //   .subscribe(
    //     ([presenceDetails, employeeDetails]) => {
    //       console.log(
    //         '+++++++++++++++++++++Presence details:',
    //         presenceDetails
    //       );
    //       console.log(
    //         '+++++++++++++++++++++Employee details:',
    //         employeeDetails
    //       );

    //       const employeeId = presenceDetails['employee']['person'];
    //       const employees = Array.isArray(employeeDetails)
    //         ? employeeDetails
    //         : [employeeDetails];
    //       const employee = employees.find((emp) => emp['id'] === employeeId);

    //       this.Groupform.patchValue({
    //         presence_date: presenceDetails['start_date'],
    //         total_hours: presenceDetails['leaveType']['name'],
    //         employee:
    //           presenceDetails['employee']['person']['first_name'] +
    //           ' ' +
    //           presenceDetails['employee']['person']['last_name']
    //       });
    //     },
    //     (err) => {}
    //   );
  }

  get f() {
    return this.presenceForm.controls;
  }

  convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (
      yyyy +
      '-' +
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '-' +
      (ddChars[1] ? dd : '0' + ddChars[0])
    );
  }
}
