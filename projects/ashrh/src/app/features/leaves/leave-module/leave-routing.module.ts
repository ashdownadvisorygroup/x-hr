import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from '../../../modeles/app-routes';
import { AskLeaveComponent } from './ask-leave/ask-leave.component';
import { DashCalendarComponent } from './calendar/dash-calendar/dash-calendar.component';

const routes: Routes = [
  // { path: '', component: EmployeeComponent },
  { path: '', component: AskLeaveComponent },
  { path: AppRoutes.leaves_dashboard, component: DashCalendarComponent }
];

// const routes: Routes = [
//   { path: '', component: EmployeeComponent },
//   { path: AppRoutes.new_employee, component: CreatedEmployeeComponent },
//   { path: AppRoutes.employee_profil + '/:employee_id', component: EmployeProfilComponent },
//   { path: AppRoutes.update_employee + '/:employee_id', component: UpdateComponent },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule {}
