import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ash-dialog-attendance-form',
  templateUrl: './dialog-attendance-form.component.html',
  styleUrls: ['./dialog-attendance-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAttendanceFormComponent {
  attendanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAttendanceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.attendanceForm = this.fb.group({
      start_date: [],
      end_date: []
    });
  }

  onSubmit(formData: any): void {
    this.dialogRef.close(formData);
    console.log('**********DATA', formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
