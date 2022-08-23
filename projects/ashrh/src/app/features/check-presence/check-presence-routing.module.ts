import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { CheckPresenceComponent } from './check-presence.component';
import { CheckArriveComponent } from './check-arrive/check-arrive.component';
import { CheckDepartComponent } from './check-depart/check-depart.component';
import { AuthGuard } from '../authentification/auth/auth.guard';

const routes: Routes = [
  { path: '', component: CheckPresenceComponent, canActivate: [AuthGuard] },
  {
    path: 'check-arrive',
    component: CheckArriveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'check-depart',
    component: CheckDepartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckPresenceRoutingModule {}
