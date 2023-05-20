import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbListService } from '../../../core/services/db-list.service';
import { NotificationService } from '../../../core/core.module';
import { DbUtilityService } from '../../../core/services/db-utility.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ash-contract-dialog',
  templateUrl: './contract-dialog.component.html',
  styleUrls: ['./contract-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDialogComponent implements OnInit {
  contractForm = new FormGroup({});
  daily_salary: number;
  monthly_salary: number;
  number_work_days: number;
  number_deliverables: number;
  contract = [
    {
      key: 'name',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    {
      key: 'salary',
      validators: [Validators.required],
      type: 'number',
      default: ''
    },
    {
      key: 'post',
      validators: [Validators.required],
      type: 'select',
      default: '',
      options: []
    },
    {
      key: 'bonus',
      validators: [Validators.required],
      type: 'number',
      default: ''
    },
    {
      key: 'description',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    {
      key: 'daily_salary',
      validators: [Validators.required],
      type: 'number',
      default: ''
    },
    {
      key: 'monthly_salary',
      validators: [Validators.required],
      type: 'number',
      default: ''
    },
    {
      key: 'number_work_days',
      validators: [Validators.required],
      type: 'number',
      default: ''
    },
    {
      key: 'number_deliverables',
      validators: [Validators.required],
      type: 'number',
      default: ''
    }
  ];
  constructor(
    private db_list: DbListService,
    private dbUtilityService: DbUtilityService,
    private notiservice: NotificationService
  ) {}

  ngOnInit(): void {
    for (const cont of this.contract) {
      this.contractForm.addControl(
        cont.key,
        new FormControl(null, cont.validators)
      );
    }

    this.dbUtilityService
      .getPosts()
      .pipe(take(1))
      .subscribe((data) => {
        this.contract[2]['options'] = data;
      });
  }

  addContract() {
    console.log(this.contractForm.value);

    this.db_list.addContract({ ...this.contractForm.value }).subscribe(
      (resp) => {
        this.notiservice.success('Contract has been created !');
      },
      (error) => this.notiservice.success(error)
    );
  }
}
