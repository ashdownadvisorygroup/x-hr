import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { DbDepartmentsService } from '../../../core/services/db-departments.service';
import {
  GroupData,
  SafewareData
} from '../../settings-employ/settings-employ.component';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Observable } from 'rxjs';
import { DbListService } from '../../../core/services/db-list.service';
import { FormControl, Validators, FormGroup, Form } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../core/core.module';


//../core/services/db-list.service
@Component({
  selector: 'ash-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', animate(1000))
    ])
  ]
})
@Injectable({
  providedIn: 'root'
})
export class DialogComponent implements OnInit {
  working_group: GroupData[];
  displayError = false;
  Groupform = new FormGroup({
    name: new FormControl('', Validators.required),
    responsible: new FormControl('', Validators.required)
  });
  responsibles: any[] = [];
  url: string = 'http://192.168.33.10:8000/api/grh/responsible/';

  constructor(
    private db_department: DbDepartmentsService,
    private db_list: DbListService,
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private notiservice: NotificationService,
    private trans: TranslateService
    
  ) {}

  ngOnInit(): void {
    this.db_list.getWorkingGroups().subscribe((data) => {
      this.working_group = data;
      this.cd.detectChanges();
    });

    this.httpClient
      .get<any[]>(this.url)
      .pipe(share())
      .subscribe((resp) => {
        this.responsibles = resp;
        // console.log('donnees des groups deja existants', this.groupsName);
      });
  }

  addGroup(): void {
    let val1 = this.Groupform.get('name').value;
    let val2 = this.Groupform.get('responsible').value;
    // let tab = this.working_group.filter((elt) => `${elt.id}` === `${val2}`);
    for (let obj of this.working_group) {
      if (
        obj.name.trim().toLowerCase() === val1.trim().toLowerCase() &&
        `${val2}` === `${obj.responsible.id}`
      ) {
        alert('ce groupe existe deja 😐😑');
        this.displayError = true;
      }
    }
    if (!this.displayError) {
      this.addElementGroup({
        name: val1,
        responsible: val2
      }).subscribe((resp) => {
        console.log('response of dialog', resp);
        this.notiservice.success(this.trans.instant('created succefully'));
      });
    }
  }
  addElementGroup(element: GroupData): Observable<any> {
    return this.db_list.addWorkingGroup(element);
  }
}
