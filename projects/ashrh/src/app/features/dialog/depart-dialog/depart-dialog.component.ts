import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DbListService } from '../../../core/services/db-list.service';
import { DbDepartmentsService } from '../../../core/services/db-departments.service';
import { NotificationService } from '../../../core/core.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ash-depart-dialog',
  templateUrl: './depart-dialog.component.html',
  styleUrls: ['./depart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartDialogComponent implements OnInit {
  departementForm = new FormGroup({});

  departement = [
    {
      key: 'code',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    {
      key: 'name',
      validators: [Validators.required],
      type: 'textarea',
      default: ''
    }
  ];
  constructor(
    private db_department: DbDepartmentsService,
    private notiservice: NotificationService
  ) {}

  ngOnInit(): void {
    for (const depart of this.departement) {
      this.departementForm.addControl(
        depart.key,
        new FormControl(null, depart.validators)
      );
    }
  }

  addDepartment() {
    this.db_department.addDepart({ ...this.departementForm.value }).subscribe(
      (resp) => {
        this.notiservice.success('Departement has been created !');
      },
      (error) => this.notiservice.success(error)
    );
  }
}
