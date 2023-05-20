import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbListService } from '../../../core/services/db-list.service';
import { NotificationService } from '../../../core/core.module';

@Component({
  selector: 'ash-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDialogComponent implements OnInit {
  postForm = new FormGroup({});
  poste = [
    {
      key: 'name',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    {
      key: 'description',
      validators: [Validators.required],
      type: 'textarea',
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
    }
  ];
  constructor(
    private db_list: DbListService,
    // private cd: ChangeDetectorRef,
    private notiservice: NotificationService
  ) {}

  ngOnInit(): void {
    for (const post of this.poste) {
      this.postForm.addControl(
        post.key,
        new FormControl(null, post.validators)
      );
    }
  }

  addPost() {
    this.db_list.addPost({ ...this.postForm.value }).subscribe(
      (resp) => {
        this.notiservice.success('Post has been created !');
      },
      (error) => this.notiservice.success(error)
    );
  }
}
