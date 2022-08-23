import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DbUtilityService } from '../../../core/services/db-utility.service';
import { take } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { EmployeeDbService } from '../../../core/states/employees/employee-db.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../modeles/app-routes';
import { NotificationService } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { DbDepartmentsService } from '../../../core/services/db-departments.service';

@Component({
  selector: 'ashrh-created-employee',
  templateUrl: './created-employee.component.html',
  styleUrls: ['./created-employee.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => void', animate(500, style({ opacity: 0 }))),
      transition('void => *', [style({ opacity: 0 }), animate(500)])
    ])
  ]
})
export class CreatedEmployeeComponent implements OnInit {
  //functions actually has to come from the backend/settings
  // functions: any[] = [
  //   {name: 'Couturiers'},
  //   {name: 'Repasseur'},
  //   {name: 'Supperviseur'}
  // ]
  // //working group actually has to come from the backend/settings
  // working_group: any[] = [
  //   {name: 'A1'},
  //   {name: 'A2'},
  //   {name: 'A3'},
  //   {name: 'A4'},
  //   {name: 'A5'},
  // ]
  // // working period is fixed
  // working_period: any[] = [
  //   {name: 'Day'},
  //   {name: 'Night'},
  // ]

  userimage = null;
  url_user_image: any = '/assets/man-avatar.jpg';
  create_account = false;
  informationPerso = [
    {
      key: 'first_name',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    { key: 'last_name', validators: [], type: 'text', default: '' },
    {
      key: 'email',
      validators: [Validators.required],
      type: 'email',
      default: ''
    },
    {
      key: 'cni',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    { key: 'address', validators: [], type: 'text', default: '' },
    { key: 'birthday', validators: [], type: 'date', default: '' },
    {
      key: 'phone',
      validators: [Validators.required],
      type: 'tel',
      default: ''
    },
    {
      key: 'start_date',
      validators: [Validators.required],
      type: 'date',
      default: Date.now()
    }
  ];

  poste = [
    // {key: 'departement', validators: [], options: []},
    { key: 'post', validators: [Validators.required], options: [] },
    { key: 'working_group', validators: [], options: [] },
    { key: 'working_period', validators: [Validators.required], options: [] }
  ];
  urgent_phone = [
    { key: 'emergency_first_name', validators: [], type: 'text' },
    { key: 'emergency_last_name', validators: [], type: 'text' },
    { key: 'emergency_address', validators: [], type: 'text' },
    { key: 'emergency_phone', validators: [], type: 'tel' }
  ];
  compte = [
    { key: 'username', validators: [Validators.required], type: 'text' },
    { key: 'password', validators: [Validators.required], type: 'password' },
    {
      key: 'confirm_password',
      validators: [Validators.required],
      type: 'password'
    }
  ];
  addressForm = new FormGroup({});

  compteForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['']
    },
    {
      validators: (fg: FormGroup) => {
        const { errors } = fg.controls['confirm_password'];
        if (
          fg.controls['password'].value !==
          fg.controls['confirm_password'].value
        ) {
          fg.controls['confirm_password'].setErrors({
            ...errors,
            different: true
          });
        } else {
          const { different, ...othererrors } = errors || {};
          fg.controls['confirm_password'].setErrors(
            Object.keys(othererrors).length > 0 ? othererrors : null
          );
        }
      }
    }
  );
  passeye = true;
  confipasseye = true;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private dbUtilityService: DbUtilityService,
    private employeeDbService: EmployeeDbService,
    private router: Router,
    private notiservice: NotificationService,
    private trans: TranslateService,
    private db_department: DbDepartmentsService
  ) {}

  ngOnInit(): void {
    this.dbUtilityService
      .getPostGroupsPeriod()
      .pipe(take(1))
      .subscribe((data) => {
        for (const post of this.poste) {
          post.options = [...data[post.key], null];
        }
        this.cd.detectChanges();
      });

    for (const info of this.informationPerso) {
      this.addressForm.addControl(
        info.key,
        new FormControl(info.default, info.validators)
      );
    }
    this.addressForm.addControl('activate', new FormControl(true));
    this.addressForm.addControl('genre', new FormControl('M'));

    for (const post of this.poste) {
      this.addressForm.addControl(
        post.key,
        new FormControl(null, post.validators)
      );
    }

    for (const urgent of this.urgent_phone) {
      this.addressForm.addControl(
        urgent.key,
        new FormControl('', urgent.validators)
      );
    }

    //this.db_department.getAllDepart().subscribe( data => {this.working_group = data})
  }

  onSubmit() {
    const formdata = new FormData();
    let data = {};
    for (const info of this.informationPerso) {
      console.log(`${info.key}`, this.addressForm.controls[info.key].value);
      if (
        info.key !== 'birthday' &&
        this.addressForm.controls[info.key].value !== ''
      ) {
        formdata.append(info.key, this.addressForm.controls[info.key].value);
        data[`${info.key}`] = this.addressForm.controls[info.key].value;
      }
    }
    formdata.append('activate', this.addressForm.controls['activate'].value);
    formdata.append('genre', this.addressForm.controls['genre'].value);

    data['activate'] = this.addressForm.controls['activate'].value;
    data['genre'] = this.addressForm.controls['genre'].value;
    if (this.userimage) {
      formdata.append('picture', this.userimage);
    }
    // else{
    //   formdata.append('picture', this.url_user_image)
    // }
    //
    if (this.create_account) {
      formdata.append('create_account', 'True');
      data['create_account'] = 'True';

      formdata.append(
        'user__username',
        this.compteForm.controls['username'].value
      );
      data['user__username'] = this.compteForm.controls['username'].value;

      formdata.append('username', this.compteForm.controls['username'].value);
      data['username'] = this.compteForm.controls['username'].value;

      formdata.append(
        'user__password',
        this.compteForm.controls['password'].value
      );
      data['user__password'] = this.compteForm.controls['password'].value;
    }
    //
    for (const item of this.poste) {
      if (this.addressForm.controls[item.key].value) {
        console.log('item.key', this.addressForm.controls[item.key].value.id);
        formdata.append(item.key, this.addressForm.controls[item.key].value.id);
        data[`${item.key}`] = this.addressForm.controls[item.key].value.id;
      }
    }
    //
    for (const item of this.urgent_phone) {
      //   console.log(`${item.key} 1`,this.addressForm.controls[item.key].value);
      // if (this.addressForm.controls[item.key].value) {
      formdata.append(item.key, this.addressForm.controls[item.key].value);
      data[`${item.key}`] = this.addressForm.controls[item.key].value;
      //   console.log(`${item.key} 2`, data[`${item.key}`]);
      // }
    }
    /*
    console.log('that is the formdata !!!!!!!!!!!!', formdata.get('post')); //formdata.get('user__username'));
    console.log(
      'that is the formdata !!!!!!!!!!!!',
      formdata.get('working_group')
    );
    console.log(
      'that is the formdata !!!!!!!!!!!!',
      formdata.get('working_period')
    );
    console.log(
      'that is the formdata !!!!!!!!!!!!',
      formdata.get('user__username')
    );
    */

    //   for (var pair of formdata) {
    //     console.log(pair[0]+ ' - ' + pair[1]);
    // }
    console.log('that is data ++++++++', data);
    var object = {};
    formdata.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    this.employeeDbService
      .createEmployee(data)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.notiservice.success(this.trans.instant('created succefully'));
          this.router.navigate(['/' + AppRoutes.home + '/employees']);
        },
        (err) => {
          console.warn(err);
          // console.log('that is error1', err.response);
          // console.log('that is error1', err.response.status);
          // console.log('that is error1', err.response.data);
          if (err.error.non_field_errors) {
            this.notiservice.error(
              this.trans.instant(err.error.non_field_errors[0])
            );
          } else if (err.error.username) {
            this.notiservice.error(this.trans.instant(err.error.username[0]));
          }
        }
      );
  }

  setImage(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.userimage = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.url_user_image = e.target.result;
        this.cd.detectChanges();
      };

      reader.readAsDataURL(this.userimage);
    }
  }

  addCreateAccount(checked: boolean) {
    if (checked) {
      this.addressForm.addControl('compte', this.compteForm);
    } else {
      this.addressForm.removeControl('compte');
    }
  }

  setWorkingGroups() {}
}
