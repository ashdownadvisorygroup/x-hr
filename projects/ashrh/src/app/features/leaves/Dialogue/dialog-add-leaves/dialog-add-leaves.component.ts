import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Observable } from 'rxjs';
import {
  FormControl,
  Validators,
  FormGroup,
  Form,
  FormBuilder
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../core/core.module';
import { LeaveService } from '../../../../core/services/leave.service';
import { take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ash-dialog-add-leaves',
  templateUrl: './dialog-add-leaves.component.html',
  styleUrls: ['./dialog-add-leaves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddLeavesComponent implements OnInit {
  minDate: Date;
  create_leave_req_msg: string;
  submitted = false;
  public has_error = false;
  leaveTypes: Observable<any>;
  employees: Observable<any>;
  leaveForm: FormGroup;
  Groupform = new FormGroup({
    type: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required)
  });
  responsibles: any[] = [];
  //url: string = 'http://192.168.33.10:8000/api/grh/responsible/';
  employee = [
    {
      key: 'employee',
      validators: [Validators.required],
      options: [],
      type: 'select'
    }
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private notiservice: NotificationService,
    private LeaveServiceDB: LeaveService,
    private dialogRef: MatDialogRef<DialogAddLeavesComponent>,
    private trans: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    // console.log('datet time',this.convertDate('2022-08-10T10:18:45.709103Z'));

    this.LeaveServiceDB.loadLeavesTypes()
      .pipe(take(1))
      .subscribe(
        (resp) => {
          // this.notiSelect.success('Suppression succefully');
          // this.query(this.paramSearch);
          console.log('that leavesTypes', resp);
          this.leaveTypes = resp['results'];
        },
        (err) => {}
      ); //_leaveTypeService.getAllLeaveTypes();

    this.LeaveServiceDB.loadEmployees()
      .pipe(take(1))
      .subscribe(
        (resp) => {
          // this.notiSelect.success('Suppression succefully');
          // this.query(this.paramSearch);
          console.log(
            '****************EMPLOYEEEEEEEEEEEEEEEEEEEEE*********************',
            resp
          );
          this.employees = resp['results'];
        },
        (err) => {}
      ); //_leaveTypeService.getAllLeaveTypes();

    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      employee: ['', Validators.required],
      leaveReason: ['', [Validators.required, Validators.minLength(3)]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  get f() {
    return this.leaveForm.controls;
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.leaveForm.invalid) {
      return;
    }
    // const submissionData = { ...this.leaveForm.value, 'leaveTypeDTO': { 'leaveTypeId': this.leaveForm.value.leaveType } };
    const submissionData = {
      leaveType: this.leaveForm.value.leaveType,
      employee: this.leaveForm.value.employee,
      // employee: `${JSON.parse(localStorage.getItem('ASHRH-employee/Rh_id'))}`,
      start_date: this.convertDate(this.leaveForm.value.fromDate),
      end_date: this.convertDate(this.leaveForm.value.toDate),
      reason: this.leaveForm.value.leaveReason,
      state: 'PENDING'
    };
    console.log('element to submit', submissionData);

    this.LeaveServiceDB.createLeaves(submissionData)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.has_error = false;
          this.create_leave_req_msg = 'Leave Request succesfully Submitted';
          this.leaveForm.reset();
          this.submitted = false;
        },
        (error) => {
          // console.log("leave creation error", error.error);
          this.has_error = true;
          this.create_leave_req_msg = error.error.message;
        }
      );

    // addElementGroup(element: GroupData): Observable<any> {
    //   return this.db_list.addWorkingGroup(element);
    // }

    this.dialogRef.close();
  }
}
