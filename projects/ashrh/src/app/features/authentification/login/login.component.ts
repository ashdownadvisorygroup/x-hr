import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LocalStorageService } from '../../../core/local-storage/local-storage.service';
import { selectSettingsLanguage } from '../../../core/settings/settings.selectors';
import { actionSettingsChangeLanguage } from '../../../core/settings/settings.actions';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { AppRoutes } from '../../../modeles/app-routes';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { authLogin } from '../../../core/auth/auth.actions';
import { RoutesService } from '../../../core/routes/routes.service';
import { EmployeeDbService } from '../../../core/states/employees/employee-db.service';

@Component({
  selector: 'ashrh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  forgotpass = '/' + AppRoutes.forgotpasswod;
  logo = '../assets/logo.png';
  fr = '../../assets/fr.png';
  en = '../../assets/en.png';
  langMap = {
    fr: 'Français',
    en: 'English'
  };
  // registerRoute = '/' + AppRoutes.REGISTER;
  user_name = '';
  pass_word = '';
  userInfo = null;
  error = false;
  subsc = new Subscription();
  hidePass = true;
  languages = ['en', 'fr'];
  language$: Observable<any>;
  constructor(
    // private authService: AuthService,
    private localser: LocalStorageService,
    private cd: ChangeDetectorRef,
    private httpclient: HttpClient,
    // private permissionsService: NgxPermissionsService,
    // private ngxRolesService: NgxRolesService,

    private employeeDbService: EmployeeDbService,
    private store: Store,
    private routes: RoutesService
  ) {}

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  ngOnInit(): void {
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
  }

  login() {
    // this.httpclient.post(environment.server + '/api/enterprise/login/',
    this.httpclient
      .post(environment.server + '/api/main/login/', {
        username: this.user_name,
        password: this.pass_word
      })
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          // console.log('donnees recu du serveur lors du login user :::))))', res);
          this.store.dispatch(authLogin({ user: res.data }));
          this.userInfo = res.data;

          //console.log('donnees recu du serveur lors du login user :::))))', this.userInfo);
          this.localser.setItem('TOKEN', res.token.access);
          // this.localser.setItem('employee/Rh', res.user);

          this.routes.goHome();
        },
        (error) => {
          if (error.status === 401) {
            this.error = true;
            this.cd.detectChanges();
          }
          console.log('voici lerreur', error);
        }
      );
    // this.subsc.add(
    //   this.authService.log({
    //     username: this.user_name,
    //     password: this.pass_word
    //   }).subscribe(
    //       ({ token, user }) => {
    //         // let { permissions, ...useri } = user
    //         // this.localser.setItem('TOKEN', token);
    //         // this.localser.setItem('USER', useri);
    //         // this.authService.authSucess(useri);
    //         // //permissions
    //         // this.permissionsService.loadPermissions(permissions);
    //         // this.ngxRolesService.addRole(roles.ADMIN, () => useri.is_superuser)
    //       },
    //       (error) => {
    //         this.error = (error.status === 401);
    //         this.cd.detectChanges();
    //       }
    //     )
    // )
    this.employeeDbService
      .loadEmployees()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          // console.log(`donnees recu du serveur lors du login :) `,res.results[1].user.id);
          // console.log('this.userInfo?.id', this.userInfo?.id);
          var val = res.results.filter(
            (elt) => elt.person.id === this.userInfo.id
          );

          this.localser.setItem('employee/Rh_id', val[0].id);
          // this.localser.setItem('employee/Rh', res.user);

          // this.routes.goHome();
        },
        (error) => {
          console.log('voici lerreur', error);
        }
      );
  }
  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
