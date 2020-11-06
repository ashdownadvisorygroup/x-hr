import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { AppRoutes } from '../../modeles/app-routes';
import { UpdateComponent } from './update/update.component';
import { EmployeProfilComponent } from './employe-profil/employe-profil.component';
import { CreatedEmployeeComponent } from './created-employee/created-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: AppRoutes.new_employee, component: CreatedEmployeeComponent },
  { path: AppRoutes.employee_profil + '/:employee_id', component: EmployeProfilComponent },
  { path: AppRoutes.update_employee + '/:employee_id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
