import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../../modeles/app-routes';
import { NotificationService } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { DbDepartmentsService } from '../../../core/services/db-departments.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ashrh-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit {
  id;
  user: any = {};
  //picture = null;
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
    { key: 'start_date', validators: [], type: 'date', default: Date.now() }
  ];

  poste = [
    // {key: 'departement', validators: [], options: []},
    {
      key: 'post',
      validators: [Validators.required],
      options: [],
      default: ''
    },
    { key: 'working_group', validators: [], options: [], default: '' },
    { key: 'working_period', validators: [], options: [], default: '' }
  ];
  urgent_phone = [
    { key: 'emergency_first_name', validators: [], type: 'text', default: '' },
    { key: 'emergency_last_name', validators: [], type: 'text', default: '' },
    { key: 'emergency_address', validators: [], type: 'text', default: '' },
    { key: 'emergency_phone', validators: [], type: 'tel', default: '' }
  ];
  compte = [
    { key: 'username', validators: [], type: 'text', default: '' },
    { key: 'password', validators: [], type: 'password', default: '' },
    { key: 'confirm_password', validators: [], type: 'password' }
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
    private db_department: DbDepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(({ employee_id }) => {
      this.id = employee_id;
      this.employeeDbService
        .getEmployee(employee_id)
        .pipe(take(1))
        .subscribe((user: any) => {
          //  console.log('that is user loaded',user);
          this.user = user;
          // console.log(user);
          //this.url_user_image = user.picture;
          //this.create_account = user.create_account;
          for (const info of this.informationPerso) {
            info.default = user[info.key] ? user[info.key] : 'none';
          }

          for (let info of this.urgent_phone) {
            console.log(`urgent_phone element ${info.key}`, user[info.key]);
            info.default = user[info.key] ? user[info.key] : 'none';
          }

          for (const info of this.poste) {
            info.default = user[info.key]?.id ? user[info.key]?.id : 'none';
          }

          for (const info of this.compte) {
            info.default = user[info.key] ? user[info.key] : '';
          }
          //  console.log('these are the modifications');
          //  console.log(this.user);

          this.cd.detectChanges();
        });
    });

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
    this.addressForm.addControl(
      'activate',
      new FormControl(this.user.activate)
    );
    this.addressForm.addControl('genre', new FormControl(this.user.genre));

    for (const post of this.poste) {
      // console.log('voici un post charge dams post',post);
      this.addressForm.addControl(
        post.key,
        new FormControl(post.default, post.validators)
      );
      this.addressForm.get(post.key).setValue(post.default);
    }

    for (const urgent of this.urgent_phone) {
      // console.log('voici un urgent charge dams post',urgent);
      this.addressForm.addControl(
        urgent.key,
        new FormControl(urgent.default, urgent.validators)
      );
    }

    //this.db_department.getAllDepart().subscribe( data => {this.working_group = data})
  }

  onSubmit() {
    let data = {};
    const formdata = new FormData();
    for (const info of this.informationPerso) {
      // console.log('info.key',info.key);
      console.log(
        `this.addressForm.controls[info.key].value ${info.key}`,
        this.addressForm.controls[info.key].value
      );

      console.log(`ligne 216`);
      if (this.addressForm.controls[info.key].value !== 'none') {
        //  formdata.append(`${info.key}`, this.addressForm.controls[info.key].value);
        data[`${info.key}`] = this.addressForm.controls[info.key].value;
      }
    }
    // formdata.append('activate', this.addressForm.controls['activate'].value);
    data['activate'] = this.addressForm.controls['activate'].value;

    // console.log('this.addressForm.controls[activate].value',this.addressForm.controls['activate'].value);
    // formdata.append('genre', this.addressForm.controls['genre'].value);
    data['genre'] = this.addressForm.controls['genre'].value;
    if (this.userimage !== null) {
      console.log(
        'that is image where i upload !---------------------!',
        this.userimage
      );
      formdata.append('picture', this.userimage);
      // console.log('this.userimage',this.userimage);
      this.employeeDbService
        .updateEmployee(this.id, formdata)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            console.log('responce -->', resp);
          },
          (err) => {
            console.warn(err);
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
    // else{formdata.append('picture', this.url_user_image)}
    //
    /*
    if (this.create_account) {
      formdata.append('create_account', 'True');
      formdata.append(
        'user__username',
        this.compteForm.controls['username'].value
      );
      formdata.append(
        'user__password',
        this.compteForm.controls['password'].value
      );
      console.log('user__username',this.compteForm.controls['username'].value);
      console.log(
        "this.compteForm.controls['password'].value",
        this.compteForm.controls['password'].value
      );
    }
    */
    //
    for (const item of this.poste) {
      if (this.addressForm.controls[item.key].value) {
        const post = item.options.find(
          (option) => option?.id == this.addressForm.controls[item.key].value
        );
        //  console.log(`ligne 252`);
        //  formdata.append(`${item.key}`, post?.id);
        data[`${item.key}`] = post?.id;
        //  console.log(`${item.key} +++++++`,post);
        // console.log('trying to get post');
        // console.log(formdata.get(item.key).toString());
      }
    }
    //
    for (const item of this.urgent_phone) {
      if (this.addressForm.controls[item.key].value) {
        //  console.log(`ligne 263`);
        //  formdata.append(`${item.key}`, this.addressForm.controls[item.key].value);
        data[`${item.key}`] = this.addressForm.controls[item.key].value;
      }
    }

    this.employeeDbService
      .updateEmployee(this.id, data)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.notiservice.success(this.trans.instant('Updated successfully'));
          this.router.navigate(['/' + AppRoutes.home + '/employees']);
        },
        (err) => {
          console.warn(err);
          if (err.error.non_field_errors) {
            this.notiservice.error(
              this.trans.instant(err.error.non_field_errors[0])
            );
          } else if (err.error.username) {
            this.notiservice.error(this.trans.instant(err.error.username[0]));
          }
        }
      );

    //  console.log('data1', data);
  }

  setImage(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.userimage = event.target.files[0];
      const reader = new FileReader();
      console.log('load image');
      reader.readAsDataURL(this.userimage);
      reader.onload = (e) => {
        this.user.picture = e.target.result;
        this.cd.detectChanges();
      };
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
