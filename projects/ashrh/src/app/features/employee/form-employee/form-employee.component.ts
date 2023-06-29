import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { ContractEmployeeDbService } from '../../../core/states/contracts/contract-db.service';

@Component({
  selector: 'ashrh-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => void', animate(500, style({ opacity: 0 }))),
      transition('void => *', [style({ opacity: 0 }), animate(500)])
    ])
  ]
})
export class FormEmployeeComponent implements OnInit {
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
  id;
  @Input() employee: any;
  user: any = {};
  isUpdate: boolean = false;
  userimage = null;
  url_user_image: any = '/assets/man-avatar.jpg';
  create_account = false;
  add_emergency_contact_two = false;
  contractId;
  contract_employee;
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
    }
    // {
    //   key: 'work_days',
    //   validators: [Validators.required],
    //   type: 'select',
    //   options: [
    //     {
    //       name: 'MONDAY',
    //       code: 'monday'
    //     },
    //     {
    //       name: 'TUESDAY',
    //       code: 'tuesday'
    //     },
    //     {
    //       name: 'WEDNESDAY',
    //       code: 'wednesday'
    //     },
    //     {
    //       name: 'THURSDAY',
    //       code: 'thursday'
    //     },
    //     {
    //       name: 'FRIDAY',
    //       code: 'friday'
    //     },
    //     {
    //       name: 'SATURDAY',
    //       code: 'saturday'
    //     },
    //     {
    //       name: 'SUNDAY',
    //       code: 'sunday'
    //     }
    //   ],
    //   default: []
    // },
    // {
    //   key: 'work_hours_start',
    //   validators: [Validators.required],
    //   type: 'time',
    //   default: ''
    // },
    // {
    //   key: 'work_hours_end',
    //   validators: [Validators.required],
    //   type: 'time',
    //   default: ''
    // }
  ];

  poste = [
    { key: 'department', validators: [], options: [], default: '' },
    {
      key: 'post',
      validators: [Validators.required],
      options: [],
      type: 'select',
      default: ''
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
      id: 'code',
      validators: [Validators.required],
      type: 'select',
      options: [
        {
          name: 'CDD',
          code: 'cdd'
        },
        {
          name: 'CDI',
          code: 'cdi'
        }
      ],
      default: ''
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
    {
      key: 'username',
      validators: [Validators.required],
      type: 'text',
      default: ''
    },
    {
      key: 'password',
      validators: [Validators.required],
      type: 'password',
      default: ''
    },
    {
      key: 'confirm_password',
      validators: [Validators.required],
      type: 'password',
      default: ''
    }
  ];

  // addressForm = new FormGroup({});
  informationPersoForm = new FormGroup({});
  posteForm = new FormGroup({});
  contractEmployeeForm = new FormGroup({});
  emergencyForm = new FormGroup({});
  emergency_2Form = new FormGroup({});

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

  activate = false;
  genre = 'F';
  contractEmployeeId;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private dbUtilityService: DbUtilityService,
    private employeeDbService: EmployeeDbService,
    private contractEmployeeDbService: ContractEmployeeDbService,
    private router: Router,
    private notiservice: NotificationService,
    private trans: TranslateService,
    private db_department: DbDepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.informationPersoForm.addControl('genre', new FormControl('F'));
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
        console.log(
          '--------------------CONTRACTID--------------------->',
          data
        );
        this.contractId = data[0]?.id;
        this.contractEmployee[0].options = data;
        this.cd.detectChanges();
      });

    for (const info of this.informationPerso) {
      this.informationPersoForm.addControl(
        info.key,
        new FormControl(info.default, info.validators)
      );
    }
    this.informationPersoForm.addControl('activate', new FormControl(true));
    // this.informationPersoForm.addControl('genre', new FormControl('F'));
    this.informationPersoForm.addControl('genre', new FormControl());

    for (const post of this.poste) {
      // console.log('voici un post charge dams post',post);
      this.posteForm.addControl(
        post.key,
        new FormControl(post.default, post.validators)
      );
      this.posteForm.get(post.key).setValue(post.default);
    }

    for (const contractEmployee of this.contractEmployee) {
      this.contractEmployeeForm.addControl(
        contractEmployee.key,
        new FormControl(contractEmployee.default, contractEmployee.validators)
      );
    }

    let defaultValues: { [key: string]: any } = {};
    for (const urgent of this.emergency) {
      this.emergencyForm.addControl(
        'emergency_' + urgent.key,
        new FormControl(urgent.default, urgent.validators)
      );
      defaultValues['emergency_' + urgent.key] = urgent.default;
    }

    for (const urgent of this.emergency_2) {
      this.emergency_2Form.addControl(
        'emergency_2_' + urgent.key,
        new FormControl(urgent.default, urgent.validators)
      );
    }

    this.activatedRoute.params.pipe(take(1)).subscribe(({ employee_id }) => {
      this.id = employee_id;
      console.log(
        '--------------------EMPLOYEEID--------------------->',
        this.id
      );

      if (employee_id) {
        this.employeeDbService
          .getEmployee(employee_id)
          .pipe(take(1))
          .subscribe((employee: any) => {
            console.log('that is user loaded', employee);
            this.user = employee;
            this.activate = employee['data']['activate'];
            this.genre = employee['data']['person']['genre'];

            // this.informationPersoForm.controls['genre'].value =
            //   employee['data']['person']['genre'];

            this.informationPersoForm.controls['genre'].patchValue(
              employee['data']['person']['genre']
            );

            this.dbUtilityService
              .getContractEmployee(employee_id)
              .pipe(take(1))
              .subscribe((data) => {
                console.log('----------DATA-------', data);
                this.contract_employee = data;
                this.contractEmployeeId = data[0]?.id;
                for (const info of this.contractEmployee) {
                  info.default = data[0]?.[info.key] || 'none';
                  console.log(info.key + '----------CONTRACT-------' + info);
                }

                this.cd.detectChanges();
              });

            for (const info of this.informationPerso) {
              if (
                employee &&
                employee['data'] &&
                employee['data']['person'] &&
                employee['data']['person'][info.key]
              ) {
                info.default = employee['data']['person'][info.key];
              } else {
                info.default = 'none';
              }
            }

            for (let info of this.emergency) {
              if (
                employee &&
                employee['data'] &&
                employee['data']['emergency_person'] &&
                employee['data']['emergency_person'][info.key]
              ) {
                info.default = employee['data']['emergency_person'][info.key];
              } else {
                info.default = 'none';
              }
            }

            if (employee['data']['emergency_person_2']) {
              for (let info of this.emergency_2) {
                info.default =
                  employee['data']['emergency_person_2'][info.key] || 'none';
              }
              this.add_emergency_contact_two = true;
            }

            for (const info of this.poste) {
              info.default = employee['data'][info.key]?.id || 'none';
            }
            console.log('------------EEEE---------->', this.poste);

            for (const info of this.compte) {
              info.default = employee[info.key] ? employee[info.key] : 'none';
            }
            //  console.log('these are the modifications');
            //  console.log(this.user);

            this.cd.detectChanges();
          });
      }
    });

    this.informationPersoForm.addControl(
      'activate',
      new FormControl(this.activate)
    );
    this.informationPersoForm.addControl('genre', new FormControl(this.genre));

    //this.db_department.getAllDepart().subscribe( data => {this.working_group = data})
  }

  onSubmit() {
    if (!this.employee) {
      console.log('CREATE');

      const formdata = new FormData();
      let data = {};
      let dataContrat = {};
      for (const info of this.informationPerso) {
        if (this.informationPersoForm.controls[info.key].value !== '') {
          formdata.append(
            'person_' + info.key,
            this.informationPersoForm.controls[info.key].value
          );
          data[`person_${info.key}`] = this.informationPersoForm.controls[
            info.key
          ].value;
        }
      }
      for (const contract of this.contractEmployee) {
        dataContrat[`${contract.key}`] = this.contractEmployeeForm.controls[
          contract.key
        ].value;
      }

      formdata.append(
        'person_activate',
        this.informationPersoForm.controls['activate'].value
      );

      formdata.append(
        'person_genre',
        this.informationPersoForm.controls['genre'].value
      );

      console.log('+++++++', this.informationPersoForm.controls['genre'].value);

      data['person_activate'] = this.informationPersoForm.controls[
        'activate'
      ].value;
      data['person_genre'] = this.informationPersoForm.controls['genre'].value;

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
        console.log('item.key', this.posteForm.controls[item.key].value);
        formdata.append(item.key, this.posteForm.controls[item.key].value);
        data[`${item.key}`] = this.posteForm.controls[item.key].value;
      }
      //
      for (const item of this.emergency) {
        //   console.log(`${item.key} 1`,this.addressForm.controls[item.key].value);
        // if (this.addressForm.controls[item.key].value) {
        formdata.append(
          'emergency_' + item.key,
          this.emergencyForm.controls['emergency_' + item.key].value
        );
        data[`emergency_${item.key}`] = this.emergencyForm.controls[
          'emergency_' + item.key
        ].value;
        //   console.log(`${item.key} 2`, data[`${item.key}`]);
        // }
      }
      for (const item of this.emergency_2) {
        if (
          this.emergency_2Form.controls['emergency_2_' + item.key].value ==
            '' ||
          this.emergency_2Form.controls['emergency_2_' + item.key].value == null
        ) {
          break;
        }
        formdata.append(
          'emergency_2_' + item.key,
          this.emergency_2Form.controls['emergency_2_' + item.key].value
        );
        data[`emergency_2_${item.key}`] = this.emergency_2Form.controls[
          'emergency_2_' + item.key
        ].value;
      }

      var object = {};
      formdata.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);

      console.log('{{{{{{{{{', data);

      if (this.userimage) {
        this.employeeDbService
          .createEmployee(formdata)
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.contractEmployeeDbService
                .createContractEmployee({
                  ...dataContrat,
                  employee: resp['id']
                })
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
                this.notiservice.error(
                  this.trans.instant(err.error.username[0])
                );
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
                .createContractEmployee({
                  ...dataContrat,
                  employee: resp['id']
                })
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
                this.notiservice.error(
                  this.trans.instant(err.error.username[0])
                );
              }
            }
          );
      }
    } else {
      console.log('UPDATE');
      let data = {};
      let jsonData = {};
      const formdata = new FormData();

      for (const info of this.informationPerso) {
        // console.log('info.key',info.key);
        console.log(`ligne 216`);
        if (this.informationPersoForm.controls[info.key].value !== 'none') {
          //  formdata.append(`${info.key}`, this.addressForm.controls[info.key].value);
          data[`person_${info.key}`] = this.informationPersoForm.controls[
            info.key
          ].value;
        }
      }
      // formdata.append('activate', this.addressForm.controls['activate'].value);
      data['person_activate'] = this.informationPersoForm.controls[
        'activate'
      ].value;

      for (const contract of this.contractEmployee) {
        if (this.contractEmployeeForm.controls[contract.key].value !== 'none') {
          //  formdata.append(`${info.key}`, this.addressForm.controls[info.key].value);
          jsonData[`${contract.key}`] = this.contractEmployeeForm.controls[
            contract.key
          ].value;
        }
      }

      // console.log('this.addressForm.controls[activate].value',this.addressForm.controls['activate'].value);
      // formdata.append('genre', this.addressForm.controls['genre'].value);
      data['person_genre'] = this.informationPersoForm.controls['genre'].value;

      console.log('+++++++', this.informationPersoForm.controls['genre'].value);

      for (const item of this.emergency) {
        if (
          this.emergencyForm.controls['emergency_' + item.key]?.value !== 'none'
        ) {
          data[`emergency_${item.key}`] = this.emergencyForm.controls[
            'emergency_' + item.key
          ].value;
          console.log('+++++++++++++++++++', this.emergencyForm);
        }
      }

      for (const item of this.emergency_2) {
        if (
          this.emergency_2Form.controls['emergency_2_' + item.key]?.value !==
          'none'
        ) {
          //  console.log(`ligne 263`);
          formdata.append(
            `${item.key}`,
            this.emergency_2Form.controls[item.key]?.value
          );
          data[`emergency_2_${item.key}`] = this.emergency_2Form.controls[
            'emergency_2_' + item.key
          ].value;
        }
      }

      // for (const item of this.emergency) {
      //   if (this.emergencyForm.controls['emergency_' + item.key]?.value) {
      //     //  console.log(`ligne 263`);
      //     //  formdata.append(`${item.key}`, this.addressForm.controls[item.key].value);
      //     data[`emergency_${item.key}`] = this.emergencyForm.controls[
      //       'emergency_' + item.key
      //     ].value;
      //   }
      // }
      // for (const item of this.emergency_2) {
      //   if (this.emergency_2Form.controls['emergency_2_' + item.key]?.value) {
      //     //  console.log(`ligne 263`);
      //     //  formdata.append(`${item.key}`, this.addressForm.controls[item.key].value);
      //     data[`emergency_2_${item.key}`] = this.emergency_2Form.controls[
      //       'emergency_2_' + item.key
      //     ].value;
      //   }
      // }

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
                this.notiservice.error(
                  this.trans.instant(err.error.username[0])
                );
              }
            }
          );
      }

      this.contractEmployeeDbService
        .updateContractEmployee(this.contractEmployeeId, jsonData)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            console.log(
              'responceCONTRACT ----------------------------------------------------------------------->',
              resp
            );
            console.log(
              'responceJSON ----------------------------------------------------------------------->',
              jsonData
            );
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

      for (const item of this.poste) {
        if (this.posteForm.controls[item.key].value) {
          const post = item.options.find(
            (option) => option?.id == this.posteForm.controls[item.key].value
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

      this.employeeDbService
        .updateEmployee(this.id, data)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            this.notiservice.success(
              this.trans.instant('Updated successfully')
            );
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
      this.informationPersoForm.addControl('compte', this.compteForm);
    } else {
      this.informationPersoForm.removeControl('compte');
    }
  }

  setWorkingGroups() {}

  addEmergencyContactTwo() {
    let is_valid = true;
    for (const contact of this.emergency) {
      if (this.emergencyForm.controls['emergency_' + contact.key].invalid) {
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
      this.emergency_2Form.controls['emergency_2_' + contact.key].reset();
    }
    this.add_emergency_contact_two = false;
  }
}
