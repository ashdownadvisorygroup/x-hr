import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../modeles/app-routes';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor(private router: Router) {}

  public goHome() {
    this.router.navigate(['/' + AppRoutes.home]);
  }

  public goLogin() {
    this.router.navigate(['/login' + AppRoutes.login]);
  }

  public redirectToDomainLogin(protocol: string, host: string, domain: string) {
    // this.router.navigate([`/${domain}/${AppRoutes.login}`]);
    window.location.href = `${protocol}//${domain}.${host}/` + AppRoutes.login;
  }
}
