import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../../core/core.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../../core/services/leave.service';

@Component({
  selector: 'ash-leaves-types-dialog',
  templateUrl: './leaves-types-dialog.component.html',
  styleUrls: ['./leaves-types-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavesTypesDialogComponent implements OnInit {
  leaveTypeForm = new FormGroup({});

  leaveTypes = [
    {
      key: 'state',
      id: 'code',
      validators: [Validators.required],
      type: 'select',
      options: [
        {
          name: 'ACTIVE',
          code: 'active'
        },
        {
          name: 'INACTIVE',
          code: 'inactive'
        }
      ],
      default: ''
    },
    {
      key: 'name',
      validators: [Validators.required],
      type: 'text',
      default: ''
    }
  ];
  constructor(
    private db_leave: LeaveService,
    private notiservice: NotificationService
  ) {}

  ngOnInit(): void {
    for (const leaveType of this.leaveTypes) {
      this.leaveTypeForm.addControl(
        leaveType.key,
        new FormControl(null, leaveType.validators)
      );
    }
  }

  addLeaveType() {
    console.log('-+++++++++++++++++++++->');

    this.db_leave.addLeaveTypes({ ...this.leaveTypeForm.value }).subscribe(
      (resp) => {
        this.notiservice.success('leaveType has been created !');
      },
      (error) => this.notiservice.success(error)
    );
  }
}
