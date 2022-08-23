import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
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
  selector: 'ash-dialog-leave-info',
  templateUrl: './dialog-leave-info.component.html',
  styleUrls: ['./dialog-leave-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogLeaveInfoComponent implements OnInit {
  minDate: Date;
  create_leave_req_msg: string;
  submitted = false;
  public has_error = false;
  leaveTypes: Observable<any>;
  leaveForm: FormGroup;
  Groupform = new FormGroup({
    type: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required)
  });
  // responsibles: any[] = [];
  //url: string = 'http://192.168.33.10:8000/api/grh/responsible/';

  constructor(
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private notiservice: NotificationService,
    private LeaveServiceDB: LeaveService,
    private trans: TranslateService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    // console.log('bonjour snake eyes ',this.data);
    // console.log('datet time',this.convertDate('2022-08-10T10:18:45.709103Z'));

    this.LeaveServiceDB.getLeaves(this.data.id)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          // this.notiSelect.success('Suppression succefully');
          // this.query(this.paramSearch);
          this.Groupform.patchValue({
            start_date: resp['start_date'],
            end_date: resp['end_date'],
            type: resp['leaveType.name'],
            reason: resp['reason']
          });
        },
        (err) => {}
      );

    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
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
}
