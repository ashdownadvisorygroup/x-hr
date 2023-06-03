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
import { ContractEmployeeDbService } from '../../../core/states/contracts/contract-db.service';

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

  employee: any = {};
  isUpdate: boolean = false;
  userimage = null;
  url_user_image: any = '/assets/man-avatar.jpg';
  create_account = false;
  add_emergency_contact_two = false;
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
    { key: 'department', validators: [], options: [] },
    {
      key: 'post',
      validators: [Validators.required],
      options: [],
      type: 'select'
    }
  ];

  contractEmployee = [
    { key: 'contract', validators: [], options: [], type: 'select' },
    {
      key: 'start_date',
      validators: [Validators.required],
      type: 'date',
      default: Date.now()
    },
    {
      key: 'end_date',
      validators: [Validators.required],
      type: 'date',
      default: ''
    },
    {
      key: 'type',
      validators: [Validators.required],
      type: 'select',
      default: [
        {
          name: 'CDD',
          code: 'cdd'
        },
        {
          name: 'CDI',
          code: 'cdi'
        }
      ]
    }
  ];

  emergency = [
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
    {
      key: 'phone',
      validators: [Validators.required],
      type: 'tel',
      default: ''
    }
  ];
  emergency_2 = [
    {
      key: 'first_name',
      validators: [],
      type: 'text',
      default: ''
    },
    { key: 'last_name', validators: [], type: 'text', default: '' },
    {
      key: 'email',
      validators: [],
      type: 'email',
      default: ''
    },
    {
      key: 'cni',
      validators: [],
      type: 'text',
      default: ''
    },
    { key: 'address', validators: [], type: 'text', default: '' },
    {
      key: 'phone',
      validators: [],
      type: 'tel',
      default: ''
    }
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
    private contractEmployeeDbService: ContractEmployeeDbService,
    private router: Router,
    private notiservice: NotificationService,
    private trans: TranslateService,
    private db_department: DbDepartmentsService
  ) {}

  ngOnInit(): void {
    this.dbUtilityService
      .getDepartment()
      .pipe(take(1))
      .subscribe((data) => {
        this.poste[0]['options'] = data;
        this.cd.detectChanges();
      });

    this.dbUtilityService
      .getPosts()
      .pipe(take(1))
      .subscribe((data) => {
        this.poste[1]['options'] = data;
        this.cd.detectChanges();
      });

    this.dbUtilityService
      .getContract()
      .pipe(take(1))
      .subscribe((data) => {
        this.contractEmployee[0]['options'] = data;
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

    for (const contractEmployee of this.contractEmployee) {
      this.addressForm.addControl(
        contractEmployee.key,
        new FormControl(contractEmployee.default, contractEmployee.validators)
      );
    }

    for (const urgent of this.emergency) {
      this.addressForm.addControl(
        'emergency_' + urgent.key,
        new FormControl('', urgent.validators)
      );
    }
    for (const urgent of this.emergency_2) {
      this.addressForm.addControl(
        'emergency_2_' + urgent.key,
        new FormControl('', urgent.validators)
      );
    }

    //this.db_department.getAllDepart().subscribe( data => {this.working_group = data})
  }

  onSubmit() {
    const formdata = new FormData();
    let data = {};
    let dataContrat = {};
    for (const info of this.informationPerso) {
      if (this.addressForm.controls[info.key].value !== '') {
        formdata.append(
          'person_' + info.key,
          this.addressForm.controls[info.key].value
        );
        data[`person_${info.key}`] = this.addressForm.controls[info.key].value;
      }
    }
    for (const contract of this.contractEmployee) {
      if (this.addressForm.controls[contract.key].value !== '') {
        dataContrat[`${contract.key}`] = this.addressForm.controls[
          contract.key
        ].value;
      }
    }

    formdata.append(
      'person_activate',
      this.addressForm.controls['activate'].value
    );
    formdata.append('person_genre', this.addressForm.controls['genre'].value);

    data['person_activate'] = this.addressForm.controls['activate'].value;
    data['person_genre'] = this.addressForm.controls['genre'].value;

    if (this.userimage) {
      formdata.append('person_picture', this.userimage);
      console.log(
        '*********************IMAGE****************************',
        this.userimage
      );
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

      // formdata.append(
      //   'user__password',
      //   this.compteForm.controls['password'].value
      // );
      // data['user__password'] = this.compteForm.controls['password'].value;
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
    for (const item of this.emergency) {
      //   console.log(`${item.key} 1`,this.addressForm.controls[item.key].value);
      // if (this.addressForm.controls[item.key].value) {
      formdata.append(
        'emergency_' + item.key,
        this.addressForm.controls['emergency_' + item.key].value
      );
      data[`emergency_${item.key}`] = this.addressForm.controls[
        'emergency_' + item.key
      ].value;
      //   console.log(`${item.key} 2`, data[`${item.key}`]);
      // }
    }
    for (const item of this.emergency_2) {
      if (
        this.addressForm.controls['emergency_2_' + item.key].value == '' ||
        this.addressForm.controls['emergency_2_' + item.key].value == null
      ) {
        break;
      }
      formdata.append(
        'emergency_2_' + item.key,
        this.addressForm.controls['emergency_2_' + item.key].value
      );
      data[`emergency_2_${item.key}`] = this.addressForm.controls[
        'emergency_2_' + item.key
      ].value;
    }

    var object = {};
    formdata.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    if (this.userimage) {
      this.employeeDbService
        .createEmployee(formdata)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            this.contractEmployeeDbService
              .createContractEmployee({ ...dataContrat, employee: resp['id'] })
              .pipe(take(1))
              .subscribe((response) => {
                this.notiservice.success(
                  this.trans.instant('created succefully')
                );
                this.router.navigate(['/' + AppRoutes.home + '/employees']);
              });
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
    } else {
      this.employeeDbService
        .createEmployee(data)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            this.contractEmployeeDbService
              .createContractEmployee({ ...dataContrat, employee: resp['id'] })
              .pipe(take(1))
              .subscribe((response) => {
                this.notiservice.success(
                  this.trans.instant('created succefully')
                );
                this.router.navigate(['/' + AppRoutes.home + '/employees']);
              });
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
  }

  setImage(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.userimage = event.target.files[0];
      const reader = new FileReader();

      // console.log('*********IMAGES*************', this.userimage);

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

  addEmergencyContactTwo() {
    let is_valid = true;
    for (const contact of this.emergency) {
      if (this.addressForm.controls['emergency_' + contact.key].invalid) {
        is_valid = false;
        this.notiservice.error(
          'please fill all emergency one information to continue'
        );
        break;
      }
    }
    this.add_emergency_contact_two = is_valid;
  }
  removeEmergencyContactTwo() {
    for (const contact of this.emergency_2) {
      this.addressForm.controls['emergency_2_' + contact.key].reset();
    }
    this.add_emergency_contact_two = false;
  }
}
