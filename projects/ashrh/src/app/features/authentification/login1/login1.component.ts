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
  selector: 'ash-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  forgotpass = '/' + AppRoutes.forgotpasswod;
  logo = '../assets/logo.png';
  fr = '../../assets/fr.png';
  en = '../../assets/en.png';
  langMap = {
    fr: 'Français',
    en: 'English'
  };
  entreprise = '';
  userInfo = null;
  domains: string[] = [];
  error = false;
  subsc = new Subscription();
  languages = ['en', 'fr'];
  language$: Observable<any>;
  constructor(
    private localser: LocalStorageService,
    private cd: ChangeDetectorRef,
    private httpclient: HttpClient,
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

  redirectToDomainLogin(domain: string) {
    console.log('web url-------------', window.location);
    const webUrl = window.location;
    const protocol = webUrl.protocol;
    const host = webUrl.host;
    this.routes.redirectToDomainLogin(protocol, host, domain);
  }

  login() {
    localStorage.clear();
    this.domains = [];

    this.httpclient
      .post(environment.server + '/api/select_domain/', {
        username: this.entreprise
      })
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          this.userInfo = res.data;

          if (res.domains && Array.isArray(res.domains)) {
            this.domains = res.domains.map((domain) => {
              return domain.split('.')[0];
            });
            if (this.domains.length > 0 && this.domains.length <= 1) {
              // Redirection si un seul domaine
              this.localser.setItem('DOMAINS', res.domains);
              const domain = this.domains[0];
              this.redirectToDomainLogin(domain);
              return;
            }
          }

          if (res.token && res.token.access) {
            this.localser.setItem('TOKEN', res.token.access);
            this.localser.setItem('user', res.data);
          }

          this.cd.detectChanges();

          console.log('Domains before routing: ', this.domains);

          this.routes.goLogin();
        },
        (error) => {
          if (error.status === 401) {
            this.error = true;
            this.cd.detectChanges();
          }
          console.log('voici lerreur', error);
        }
      );
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
