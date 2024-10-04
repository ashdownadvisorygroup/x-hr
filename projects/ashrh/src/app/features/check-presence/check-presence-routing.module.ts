import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { CheckPresenceComponent } from './check-presence.component';
import { AuthGuard } from '../authentification/auth/auth.guard';

const routes: Routes = [
  { path: '', component: CheckPresenceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckPresenceRoutingModule {}
