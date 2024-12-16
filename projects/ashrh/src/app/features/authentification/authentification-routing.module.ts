import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppRoutes } from '../../modeles/app-routes';
import { AuthGuard } from './auth/auth.guard';
import { Login1Component } from './login1/login1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.select_domain,
    pathMatch: 'full'
  },
  { path: AppRoutes.select_domain, component: Login1Component },
  { path: AppRoutes.login, component: LoginComponent },
  { path: AppRoutes.forgotpasswod, component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule {}
