import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  environment as env,
  environment
} from '../../../environments/environment';
import { routeAnimations } from '../../core/animations/route.animations';
import { authLogout } from '../../core/auth/auth.actions';
import { selectIsAuthenticated } from '../../core/auth/auth.selectors';
import { actionSettingsChangeLanguage } from '../../core/settings/settings.actions';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from '../../core/settings/settings.selectors';
import { AppRoutes } from '../../modeles/app-routes';
import { AuthService } from '../../core/auth/auth.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit, AfterViewInit {
  version = env.versions.app;
  home = '/home';
  year = new Date().getFullYear();
  logo = require('../../../assets/logo.png').default;
  languages = ['en', 'fr'];
  user: any = { picture: '', username: '' };
  server = environment.server;
  loadUserSuccess = true;
  navigation = [
    { link: '/home', label: 'All Modules' },
    { link: AppRoutes.employees, label: 'Employees' },
    { link: AppRoutes.check_presence, label: 'Presence' },
    // { link: AppRoutes.end_shift, label: 'End shift' },
    { link: AppRoutes.settings_employ, label: 'Settings' },
    { link: AppRoutes.payment, label: 'Payments' },
    { link: AppRoutes.leaves, label: 'leaves' },
    { link: AppRoutes.leaves_dashboard, label: 'leaves Rh' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store,
    private authser: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));

    this.authser.user$
      .pipe(
        filter((elt) => !!elt),
        take(1)
      )
      .subscribe((user) => {
        this.user = user;
        this.cd.detectChanges();
      });
    // this.store.pipe(select(selectIsAuthenticated)).subscribe(user => {
    //   this.user = user ? user.username : null;
    // });
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
