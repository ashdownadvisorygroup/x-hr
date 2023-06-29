import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../core/core.module';
import { EmployeeDbService } from '../../../core/states/employees/employee-db.service';
import { AppRoutes } from '../../../modeles/app-routes';
import * as _ from 'lodash';

@Component({
  selector: 'ashrh-employe-profil',
  templateUrl: './employe-profil.component.html',
  styleUrls: ['./employe-profil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeProfilComponent implements OnInit {
  id;
  update_employee = '../../' + AppRoutes.update_employee;
  user: any = {};
  picture = '';
  defaultImage = '/assets/man-avatar.jpg';
  // employees: any[] = [
  //   {}
  // ];
  _: any;
  about = [
    {
      title: 'Information personelle',
      keys: [
        { key: 'first_name' },
        { key: 'last_name' },
        { key: 'email' },
        { key: 'cni' },
        { key: 'address' },
        { key: 'birthday' },
        { key: 'phone' }

        // {key: 'created_at'},
      ]
    },
    {
      title: 'Poste',
      keys: [
        { key: 'name' },
        { key: 'daily_salary' },
        { key: 'monthly_salary' },
        { key: 'number_work_days' },
        { key: 'description' }
      ]
    },
    {
      title: "Contact d'urgence",
      keys: [
        { key: 'cni' },
        { key: 'first_name' },
        { key: 'last_name' },
        { key: 'address' },
        { key: 'phone' }
      ]
    },
    {
      title: "Contact d'urgence 2",
      keys: [
        { key: 'cni' },
        { key: 'first_name' },
        { key: 'last_name' },
        { key: 'address' },
        { key: 'phone' }
      ]
    }
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeDbService: EmployeeDbService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private notiservice: NotificationService,
    private trans: TranslateService
  ) {
    this._ = _;
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(({ employee_id }) => {
      this.id = employee_id;
      this.employeeDbService
        .getEmployee(employee_id)
        .pipe(take(1))
        .subscribe((user: any) => {
          this.user = user.data;
          this.picture = user.data.person.picture;
          this.cd.detectChanges();
          // console.log(this.picture);
          // console.log(this.user.picture);
          // console.log(user);
          // console.log('this is the emergency contact:');
          // console.log(user.emergency_contact);
        });
    });
  }
  deleteEmployee() {
    this.employeeDbService.deleteEmployee(this.id).subscribe(() => {
      this.notiservice.success(this.trans.instant('deleted successfully'));
      this.router.navigate(['/' + AppRoutes.home + '/employees']);
      console.log(`trying to delete employee with id: ${this.id}`);
    });
  }
}
