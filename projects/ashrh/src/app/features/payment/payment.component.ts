import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { PageEvent } from '@angular/material/paginator';
import { DbDepartmentsService } from '../../core/services/db-departments.service';
import { SafewareData } from '../settings-employ/settings-employ.component';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EmployeeDbService } from '../../core/states/employees/employee-db.service';
import { stringify } from 'querystring';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DbListService } from '../../core/services/db-list.service';
import { DbUtilityService } from '../../core/services/db-utility.service';

export interface EmployeeData {
  id: number;
  daily_salary: number;
  monthly_salary: number;
  post: string;
  number_work_days: number;
  employeePost1: string;
}

@Component({
  selector: 'ash-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterExpand', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: '*' })),
      transition('false <=> true', animate(1000))
    ])
  ]
})
export class PaymentComponent implements OnInit {
  //OnInit {
  postsObservable: Observable<SafewareData[]>;
  posts: SafewareData[] = null;
  check: boolean = false;
  employees: any[] = null;

  colDistribute: {
    daily_salary: number;
    monthly_salary: number;
    name: string;
    number_work_days: number;
    employeePost: Array<string>;
  }[] = [];

  // displayedColumns: string[] = ['Employees', 'Number of days', 'Daily Salary', 'Salary'];
  /*
      dataSource1: MatTableDataSource<{
        select: boolean;
        daily_salary: number;
        monthly_salary: number;
        post: string;
        number_work_days: number;
        employeePost1: string;
      }>;
    */
  dataSource1: MatTableDataSource<EmployeeData>;

  //colDistribute  = new Map<string, number>();
  list: any[] = [
    {
      post: 'Couturiers',
      monthly_salary: 90000,
      num_of_days: 26,
      daily_salary: 90000 / 26
    },
    {
      post: 'Coordonnqteur jour/nuit',
      monthly_salary: 130000,
      num_of_days: 26,
      daily_salary: 130000 / 26
    },
    {
      post: 'Repassage',
      monthly_salary: 60000,
      num_of_days: 26,
      daily_salary: 60000 / 26
    },
    {
      post: 'Compteurs de masques',
      monthly_salary: 50000,
      num_of_days: 26,
      daily_salary: 50000 / 26
    },
    {
      post: 'Manutentionnaires',
      monthly_salary: 70000,
      num_of_days: 26,
      daily_salary: 70000 / 26
    },
    {
      post: 'Coupeurs',
      monthly_salary: 780000,
      num_of_days: 26,
      daily_salary: 78000 / 26
    },
    {
      post: 'Superviseur coupe',
      monthly_salary: 100000,
      num_of_days: 26,
      daily_salary: 100000 / 26
    }
  ];

  dataSource: EmployeeData[] = [];

  colDistribution = [
    {
      header: 'Employees',
      distrib: (el) => el.employeePost,
      options: { key: 'Employees', type: 'string' }
    },
    {
      header: 'Number of days',
      distrib: (el) => el.number_work_days,
      options: { key: 'num_of_days', type: 'number' }
    },
    {
      header: 'Daily Salary',
      distrib: (el) => el.daily_salary,
      options: { key: 'daily_salary', type: 'number' }
    },
    /*
    {
      header: 'Benefits.',
      distrib: (el) => 0,//el.benefits,
      options: {
        key: 'daily_salary',
        type: 'number',
        setValue: (event, element) => {
          element.benefits = event;
          element.salary = element.salary + element.benefits;
        }
      }
    },
    */
    {
      header: 'Salary',
      distrib: (el) => el.monthly_salary,
      options: { key: 'salary', type: 'number' }
    }
  ];
  displayedColumns: string[] = [
    'id',
    'employeePost1',
    'number_work_days',
    'daily_salary',
    'monthly_salary',
    'post'
  ];
  /*
        [
          'Employees',
          'Number of days',
          'Daily Salary',
          'Salary',
          'post'
        ];
        [
          'employeePost1',
          'number_work_days',
          'daily_salary',
          'monthly_salary',
          'post'
        ];
        */

  /*
        displayedColumnsFilter: string[] = [
          'Employees_filter',
          'Number_of_days_filter',
          'Daily_Salary_filter',
          'Salary_filter',
          'post_filter'
        ];
      */

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private db_department: DbDepartmentsService,
    private db_employee: EmployeeDbService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private db_list: DbListService,
    private db_utily: DbUtilityService
  ) {
    this.postsObservable = this.db_utily.getPosts();
    //const display = Array.from({length: 100}, (_, k) => createNewUser(k+1));

    // Assign the data to the data source for the table to render
    // this.dataSource1 = new MatTableDataSource(this.dataSource);
  }

  /*
  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    // this.dataSource1 = new MatTableDataSource(this.dataSource);
   // this.dataSource1 = this.dataSource1;
  }
  */

  ngOnInit(): void {
    // this.dataSource1.paginator = this.paginator;
    // this.dataSource1.sort = this.sort;
    if (this.dataSource1 != undefined) {
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
    }
    // this.dataSource1.sort = this.sort;
    // this.dataSource1.paginator = this.paginator;

    this.db_utily.getPosts().subscribe((dataposts) => {
      this.posts = dataposts;

      this.check = true;
      this.cd.detectChanges();
    });

    let elts = [];
    this.db_employee.loadEmployees().subscribe((data) => {
      let elts = data['results'];
      // console.log('voici les datas', elts);

      for (let dat of this.posts) {
        console.log('voici une data', dat);
        //this.employees?.push(dat.result);
        //console.log('that is post ..............', dat);
        this.colDistribute.push({
          daily_salary: dat.daily_salary,
          monthly_salary: dat.monthly_salary,
          name: dat.name,
          number_work_days: dat.number_work_days,
          employeePost: ['']
        });
      }
      //  console.log('that is obj .....', this.colDistribute);
      //console.log('that is elts',elts);
      for (let obj of elts) {
        //  console.log('voici les coldistributions', obj);

        for (let obj2 of this.colDistribute) {
          // console.log('that is obj .....',obj2);
          if (obj2.name === `${obj.post.name}`) {
            // console.log('number',i);
            obj2.employeePost.push(`${obj.first_name} ${obj.last_name}`);
          }
          //  this.colDistribute[i].employeePost.push(obj);

          //  console.log('number',i);
        }
      }

      // console.log('voici les coldistributions', this.colDistribute);
      var i = 0;
      for (let l of this.colDistribute) {
        for (let el of l.employeePost) {
          if (el !== '') {
            i++;
            this.dataSource.push({
              id: i,
              employeePost1: el.toLowerCase(),
              daily_salary: l.daily_salary,
              monthly_salary: l.monthly_salary,
              post: l.name,
              number_work_days: l.number_work_days
            });
          }
        }
      }
      // this.dataSource1 = new MatTableDataSource(this.dataSource);

      let da = this.dataSource;
      this.dataSource1 = new MatTableDataSource<EmployeeData>(da);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
      setTimeout(() => {
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      });

      // this.dataSource1.sort = this.sort;
    });

    //console.log('voici les postes', this.posts);
    // console.log('voici les coldistributions', this.colDistribute);
    this.postsObservable = this.db_utily.getPosts();
    //console.log('voici les postes',this.postsObservable);

    //    this.dataSource1.sort = this.sort;

    console.log('that is all datasources', this.dataSource1);
    console.log(
      'that is all datasources-------------------------',
      this.dataSource
    );
    // this.dataSource1 = new MatTableDataSource(this.dataSource);

    //this.dataSource1.sort = this.sort;
    //this.dataSource1.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
