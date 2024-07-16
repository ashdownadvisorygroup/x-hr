import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
import { Login1Component } from './login1/login1.component';
//import { AskLeavesComponent } from './leaves/ask-leaves/ask-leaves.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, Login1Component],
  imports: [CommonModule, AuthentificationRoutingModule, SharedModule]
})
export class AuthentificationModule {}
