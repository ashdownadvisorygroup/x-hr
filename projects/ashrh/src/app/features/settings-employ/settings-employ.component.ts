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
  working_group: GroupData[];
  selectedGroups = [];
  // working_group: any[] = [
  //   {name: 'A1'},
  //   {name: 'A2'},
  //   {name: 'A3'},
  //   {name: 'A4'},
  //   {name: 'A5'},
  // ]
  working_period: PeriodData[];
  selectedPeriods = [];
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
          this.db_department.updateDepart(element).subscribe(() => {
            this.db_department.getAllDepart().subscribe((data) => {
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
          this.db_department.updateDepart(element).subscribe(() => {
            this.db_department.getAllDepart().subscribe((data) => {
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
          this.db_department.updateDepart(element).subscribe(() => {
            this.db_department.getAllDepart().subscribe((data) => {
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
      header: 'Period',
      distrib: (el) => el.name,
      options: {
        setValue: (event, element) => {
          element.name = event;
          this.db_utily.updateWorkingPeriod(element).subscribe(() => {
            console.log('updating name');
            console.log(element);
            this.db_utily.getPostGroupsPeriod().subscribe((data) => {
              this.working_period = data.working_period;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'Start time',
      distrib: (el) => el.start_time,
      options: {
        key: 'start_time',
        setValue: (event, element) => {
          element.start_time = event;
          console.log('modification of start_time', element);
          this.db_utily.updateWorkingPeriod(element).subscribe(() => {
            this.db_utily.getPostGroupsPeriod().subscribe((data) => {
              console.log('execution du getPostGroupsPeriod', data);
              this.working_period = data.working_period;
              this.cd.detectChanges();
            });
          });
        }
      }
    },
    {
      header: 'End time',
      distrib: (el) => el.end_time,
      options: {
        key: 'end_time',
        setValue: (event, element) => {
          element.end_time = event;
          this.db_utily.updateWorkingPeriod(element).subscribe(() => {
            this.db_utily.getPostGroupsPeriod().subscribe((data) => {
              this.working_period = data.working_period;
              this.cd.detectChanges();
            });
          });
        }
      }
    }
  ];
  colDistribution_group = [
    {
      header: 'Group Name',
      distrib: (el) => el.name,
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
      header: 'Responsible',
      distrib: (el) =>
        el.responsible.first_name.toUpperCase() +
        ' ' +
        el.responsible.last_name,
      options: {
        key: 'responsible',
        type: 'option',
        setValue: (event, element) => {
          /*
          element.responsible = event;
          // console.log()
          if (element) {
            this.db_list.updateWorkingGroup(element).subscribe(() => {
              this.db_list.getWorkingGroups().subscribe((data) => {
                this.working_group = data;
                this.cd.detectChanges();
              });
            });
          } else {
            alert('veuillez choisir un responsable pour ce groupe de travail');
          }
          */
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
    this.db_department.getAllDepart().subscribe((datapost) => {
      this.working_post = datapost;
      console.log('datapost:');
      console.log(datapost);
    });
    this.db_list.getWorkingGroups().subscribe((datagroup) => {
      this.working_group = datagroup;
      console.log('datagroup:');
      console.log(datagroup);
    });
    this.db_utily.getWorkingPeriod().subscribe((dataperiod) => {
      this.working_period = dataperiod;
      console.log('dataperiod:');
      console.log(dataperiod);
    });
  }

  //CRUD for Posts
  updatePost(): void {
    this.addElementPost({
      name: 'Enter name',
      monthly_salary: 0,
      number_work_days: 0,
      daily_salary: 0
    }).subscribe(() => {
      console.log('done');
      this.db_department.getAllDepart().subscribe((data) => {
        this.working_post = data;
        this.cd.detectChanges();
      });
    });
  }
  addElementPost(element: SafewareData): Observable<any> {
    return this.db_department.addDepart(element);
  }
  deleteElementPost() {
    for (const element of this.selectedPosts) {
      this.db_department.deleteDepart(element).subscribe(() => {
        this.db_department.getAllDepart().subscribe((datapost) => {
          console.log('this is data after deleting element');
          console.log(datapost);
          this.working_post = datapost;
          this.notiservice.success('Updated succefully');
          this.cd.detectChanges();
        });
      });
    }
  }

  //CRUD for Periods
  AddPeriod(): void {
    this.addElementPeriod({
      name: 'Enter name',
      start_time: '00:00:00',
      end_time: '00:00:00'
    })
      .pipe(take(1))
      .subscribe(() => {
        console.log('done');
        this.db_utily.getWorkingPeriod().subscribe((data) => {
          this.working_period = data;
          this.cd.detectChanges();
        });
      });
  }
  addElementPeriod(element: PeriodData): Observable<any> {
    return this.db_utily.addWorkingPeriod(element);
  }
  deleteElementPeriod() {
    for (const element of this.selectedPeriods) {
      this.db_utily.deleteWorkingPeriod(element).subscribe(() => {
        this.db_utily.getWorkingPeriod().subscribe((dataperiod) => {
          console.log('this is data after deleting element');
          console.log(dataperiod);
          this.working_period = dataperiod;

          this.notiservice.success('Updated succefully');
          this.cd.detectChanges();
        });
      });
    }
  }

  //CRUD for Groups
  updateGroup(): void {
    this.addElementGroup({ name: 'Enter name', responsible: {} }).subscribe(
      () => {
        console.log('done');
        this.db_list.getWorkingGroups().subscribe((data) => {
          this.working_group = data;
          this.cd.detectChanges();
        });
      }
    );
  }
  addElementGroup(element: GroupData): Observable<any> {
    return this.db_list.addWorkingGroup(element);
  }

  deleteElementGroup() {
    for (const element of this.selectedGroups) {
      this.db_list.deleteWorkingGroup(element).subscribe(() => {
        this.db_list.getWorkingGroups().subscribe((datagroup) => {
          console.log('this is data after deleting element');
          console.log(datagroup);
          this.working_group = datagroup;

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
        this.working_group = datagroup;
        this.cd.detectChanges();
      });
    });
  }
}
