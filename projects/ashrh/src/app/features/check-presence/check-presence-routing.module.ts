import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckPresenceComponent } from './check-presence.component';
import { CheckArriveComponent } from './check-arrive/check-arrive.component';
import { CheckDepartComponent } from './check-depart/check-depart.component';

const routes: Routes = [
  { path: '', component: CheckPresenceComponent },
  { path: 'check-arrive', component: CheckArriveComponent },
  { path: 'check-depart', component: CheckDepartComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckPresenceRoutingModule { }
