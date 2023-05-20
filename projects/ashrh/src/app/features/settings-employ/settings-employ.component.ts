import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DbDepartmentsService } from '../../core/services/db-departments.service';
import { Observable } from 'rxjs';
import { DbListService } from '../../core/services/db-list.service';
import { DbUtilityService } from '../../core/services/db-utility.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';

import { NotificationService } from '../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { PostDialogComponent } from '../dialog/post-dialog/post-dialog.component';
import * as _ from 'lodash';
import { DepartDialogComponent } from '../dialog/depart-dialog/depart-dialog.component';
import { ContractDialogComponent } from '../dialog/contract-dialog/contract-dialog.component';

export interface SafewareData {
  id?: number;
  name: string;
  monthly_salary: number;
  number_work_days: number;
  daily_salary?: number;
}
export interface GroupData {
  id?: number;
  name: string;
  responsible?: any;
}
export interface PeriodData {
  id?: number;
  name: string;
  start_time: any;
  end_time: any;
}

export interface PostData {
  id?: number;
  name: string;
  description: string;
  daily_salary: number;
  monthly_salary: number;
  number_work_days: number;
}

export interface ContractData {
  id?: number;
  name: string;
  salary: string;
  post: number;
  bonus: number;
  description: string;
  daily_salary: number;
  monthly_salary: number;
  number_work_days: number;
  number_deliverables: number;
}

export interface DepartmentData {
  id?: number;
  name: string;
  code: string;
  enterprise?: any;
  parent?: any;
}

@Component({
  selector: 'ash-settings-employ',
  templateUrl: './settings-employ.component.html',
  styleUrls: ['./settings-employ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', animate(1000))
    ])
  ]
})
export class SettingsEmployComponent implements OnInit {
  date_time = new Date();
  actionText = 'Delete';
  working_post: SafewareData[];
  selectedPosts = [];
  // working_post:  SafewareData[] = [
  //   { name: 'Couturiers', monthly_salary: 90000, number_work_days: 26, daily_salary: Math.round(90000/26) },
  //   { name: 'Coordonnqteur jour/nuit', monthly_salary: 130000, number_work_days: 26, daily_salary: Math.round(130000 / 26 )},
  //   { name: 'Repassage', monthly_salary: 60000, number_work_days: 26, daily_salary: Math.round(60000 / 26) },
  //   { name: 'Compteurs de masques', monthly_salary: 50000, number_work_days: 26, daily_salary: Math.round(50000 / 26) },
  //   { name: 'Manutentionnaires', monthly_salary: 70000, number_work_days: 26, daily_salary: Math.round(70000 / 26) },
  //   { name: 'Coupeurs', monthly_salary: 780000, number_work_days: 26, daily_salary: Math.round(78000 / 26) },
  //   { name: 'Superviseur coupe', monthly_salary: 100000, number_work_days: 26, daily_salary: Math.round(100000 / 26) },
  // ]
  departments: DepartmentData[];
  selectedDepartment = [];
  // working_group: any[] = [
  //   {name: 'A1'},
  //   {name: 'A2'},
  //   {name: 'A3'},
  //   {name: 'A4'},
  //   {name: 'A5'},
  // ]
  contracts: ContractData[];
  selectedContracts = [];
  // working_period: any[] = [
  //   {name: 'Day'},
  //   {name: 'Night'},
  // ]

  colDistribution_post = [
    {
      header: 'Posts',
      distrib: (el) => el.name,
      options: {
        setValue: (event, element) => {
          element.name = event;
          this.db_list.updatePost(element).subscribe(() => {
            this.db_list.getPosts().subscribe((data) => {
              this.working_post = data;
              this.cd.detectChanges();
            });
          });
          //console.warn(element);
          //this.db_department.updateDepart(element); To update from the backend
        }
      }
    },
    {
      header: 'Monthly Salary',
      distrib: (el) => el.monthly_salary,
      options: {
        key: 'monthly_salary',
        type: 'number',
        setValue: (event, element) => {
          element.monthly_salary = event;
          //using the if statement to avoid "infinity showing on the screen in the case of a 0 division"
          if (element.number_work_days <= 0 || null) {
            element.daily_salary = 0;
          } else {
            element.daily_salary = Math.round(
              element.monthly_salary / element.number_work_days
            );
          }
          this.db_utily.updatePost(element).subscribe(() => {
            this.db_utily.getPosts().subscribe((data) => {
              // TODO
              this.working_post = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Number of days',
      distrib: (el) => el.number_work_days,
      options: {
        key: 'number_work_days',
        type: 'number',
        setValue: (event, element) => {
          element.number_work_days = event;
          console.log(event);
          console.log(element);
          if (element.number_work_days <= 0 || null) {
            element.daily_salary = 0;
          } else {
            element.daily_salary = Math.round(
              element.monthly_salary / element.number_work_days
            );
          }
          this.db_utily.updatePost(element).subscribe(() => {
            this.db_utily.getPosts().subscribe((data) => {
              this.working_post = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Daily Salary',
      distrib: (el) => el.daily_salary,
      options: {
        key: 'daily_salary',
        type: 'number',
        setValue: () => {
          alert('Cannot modify values in this column');
        }
      }
    }
    // { header: 'Actions', distrib: (el) => el.daily_salary, options: { key: 'daily_salary', type: 'action',
    // setValue: (event, element) => {
    //   console.log('this is the event being deleted');
    //   console.log(event);
    //   if (event == 1){
    //     this.db_department.deleteDepart(element).subscribe(() => {
    //       this.db_department.getAllDepart().subscribe(datapost => {
    //         console.log('this is data after deleting element');
    //         console.log(datapost);
    //         this.working_post = datapost;
    //         this.cd.detectChanges();
    //       })
    //     })
    //   }
    //   alert( 'This action is not irreversible')
    //     }
    //   }
    // },
  ];

  colDistribution_period = [
    {
      header: 'Name',
      distrib: (el) => el.name,
      options: {
        setValue: (event, element) => {
          element.name = event;
          this.db_utily.updateContract(element).subscribe(() => {
            this.db_utily.getContracts().subscribe((data) => {
              this.contracts = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Salary',
      distrib: (el) => el.salary,
      options: {
        setValue: (event, element) => {
          element.salary = event;
          this.db_utily.updateContract(element).subscribe(() => {
            this.db_utily.getContracts().subscribe((data) => {
              this.contracts = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Number of work days',
      distrib: (el) => el.number_work_days,
      options: {
        setValue: (event, element) => {
          element.number_work_days = event;
          this.db_utily.updateContract(element).subscribe(() => {
            this.db_utily.getContracts().subscribe((data) => {
              this.contracts = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Number deliverables',
      distrib: (el) => el.number_deliverables,
      options: {
        setValue: (event, element) => {
          element.number_deliverables = event;
          this.db_utily.updateContract(element).subscribe(() => {
            this.db_utily.getContracts().subscribe((data) => {
              this.contracts = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Bonus',
      distrib: (el) => el.bonus,
      options: {
        setValue: (event, element) => {
          element.bonus = event;
          this.db_utily.updateContract(element).subscribe(() => {
            this.db_utily.getContracts().subscribe((data) => {
              this.contracts = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Post',
      distrib: (el) => el.post.name,
      options: {}
    }
  ];
  colDistribution_group = [
    {
      header: 'Code',
      distrib: (el) => el.code,
      options: {
        setValue: (event, element) => {
          /*
          element.name = event;
          this.db_list.updateWorkingGroup(element).subscribe(() => {
            this.db_list.getWorkingGroups().subscribe((data) => {
              this.working_group = data;
              this.cd.detectChanges();
            });
          });
          */
        }
      }
    },
    {
      header: 'Name',
      distrib: (el) => el.name,
      options: {
        key: 'name',
        type: 'option',
        setValue: (event, element) => {
          element.name = event;
          this.db_department.updateDepart(element).subscribe(() => {
            this.db_department.getAllDepart().subscribe((data) => {
              this.departments = data;
              this.cd.detectChanges();
            });
          });
        }
      }
    }
  ];

  constructor(
    private db_department: DbDepartmentsService,
    private db_list: DbListService,
    private db_utily: DbUtilityService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private notiservice: NotificationService,
    private trans: TranslateService
  ) {}

  ngOnInit(): void {
    this.db_list.getPosts().subscribe((datapost) => {
      this.working_post = datapost;
    });
    this.db_department.getAllDepart().subscribe((datagroup) => {
      this.departments = datagroup;
    });
    this.db_utily.getContracts().subscribe((dataperiod) => {
      this.contracts = dataperiod;
    });
  }

  addPost(): void {
    const dialogRef = this.dialog.open(PostDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.db_list.getPosts().subscribe((datagroup) => {
        this.working_post = datagroup;
        this.cd.detectChanges();
      });
    });
  }
  addElementPost(element: SafewareData): Observable<any> {
    return this.db_department.addDepart(element);
  }
  deleteElementPost() {
    for (const element of this.selectedPosts) {
      this.db_utily.deletePost(element).subscribe(() => {
        this.db_utily.getPosts().subscribe((datapost) => {
          console.log('this is data after deleting element');
          console.log(datapost);
          this.working_post = datapost;
          this.notiservice.success('Updated succefully');
          this.cd.detectChanges();
        });
      });
    }
  }

  addContract(): void {
    const dialogRef = this.dialog.open(ContractDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.db_utily.getContracts().subscribe((datagroup) => {
        this.contracts = datagroup;
        this.cd.detectChanges();
      });
    });
  }
  addElementPeriod(element: PeriodData): Observable<any> {
    return this.db_utily.addWorkingPeriod(element);
  }
  deleteElementContract() {
    for (const element of this.selectedContracts) {
      this.db_utily.deleteContract(element).subscribe(() => {
        this.db_utily.getContracts().subscribe((dataperiod) => {
          this.contracts = dataperiod;
          this.notiservice.success('Updated succefully');
          this.cd.detectChanges();
        });
      });
    }
  }

  addElementGroup(element: GroupData): Observable<any> {
    return this.db_list.addWorkingGroup(element);
  }

  deleteElementDepartment() {
    for (const element of this.selectedDepartment) {
      this.db_department.deleteDepart(element).subscribe(() => {
        this.db_department.getAllDepart().subscribe((datapost) => {
          this.departments = datapost;
          this.notiservice.success('Updated succefully');
          this.cd.detectChanges();
        });
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.db_list.getWorkingGroups().subscribe((datagroup) => {
        console.log('this is data after deleting element');
        console.log(datagroup);
        // this.working_group = datagroup;
        this.cd.detectChanges();
      });
    });
  }

  openDepartmentDialog() {
    const dialogRef = this.dialog.open(DepartDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.db_department.getAllDepart().subscribe((datagroup) => {
        this.departments = datagroup;
        this.cd.detectChanges();
      });
    });
  }
}
