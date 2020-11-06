import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DbDepartmentsService } from '../../core/services/db-departments.service';
import { SafewareData } from '../settings-employ/settings-employ.component';
import { Observable } from 'rxjs';

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
  postsObservable: Observable<SafewareData[]>;
  // posts: SafewareData[] = [{ name:' Dancer',
  //   monthly_salary: 50000,
  //   number_work_days: 10,
  //   daily_salary: 5000},];
  posts: SafewareData[] = null;
  check: boolean = false;

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
  dataSource: any[] = [];

  colDistribution = [
    { header: 'Employees', distrib: (el) => el.employee },
    {
      header: 'Number of days',
      distrib: (el) => el.num_of_days,
      options: { key: 'num_of_days', type: 'number' }
    },
    {
      header: 'Daily Salary',
      distrib: (el) => el.daily_salary,
      options: { key: 'daily_salary', type: 'number' }
    },
    {
      header: 'Benefits*',
      distrib: (el) => el.benefits,
      options: {
        key: 'daily_salary',
        type: 'number',
        setValue: (event, element) => {
          element.benefits = event;
          element.salary = element.salary + element.benefits;
        }
      }
    },
    {
      header: 'Salary',
      distrib: (el) => el.salary,
      options: { key: 'salary', type: 'number' }
    }
  ];

  constructor(
    private db_department: DbDepartmentsService,
    private cd: ChangeDetectorRef
  ) {
    this.postsObservable = this.db_department.getAllDepart();
  }

  // async ngOnInit(){
  //   const Department = await this.db_department.getAllDepart();
  //   Department.forEach(value => this.posts= value);
  //   console.log(`this is it: ${this.posts}`);
  //     // for (const item of Department)
  //     // this.posts.push(item.name);
  //     //  console.log(Department);
  //     //  console.log(this.posts);

  // }
  ngOnInit(): void {
    this.db_department.getAllDepart().subscribe((dataposts) => {
      // for( const item of dataposts){
      //   this.posts = [...this.posts, item];
      // }

      this.posts = dataposts;

      this.check = true;
      console.log(this.check);
      console.log(this.posts);
      console.log(`this is the data: ${dataposts}`);
      this.cd.detectChanges();
    });
    this.postsObservable = this.db_department.getAllDepart();
  }
}
