import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ash-dialog-payslip-form',
  templateUrl: './dialog-payslip-form.component.html',
  styleUrls: ['./dialog-payslip-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPayslipFormComponent {
  payslipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogPayslipFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.payslipForm = this.fb.group({
      irpp: [],
      performence: []
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
