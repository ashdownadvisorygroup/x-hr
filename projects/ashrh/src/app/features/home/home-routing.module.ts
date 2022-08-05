import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllmodulesComponent } from './allmodules/allmodules.component';
import { AppRoutes } from '../../modeles/app-routes';
import { HomeBackgroundComponent } from '../../utilities-components/home-background/home-background.component';

const routes: Routes = [
  { path: '', component: AllmodulesComponent },
  {
    path: AppRoutes.employees,
    loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule),
  },
  {
    path: AppRoutes.check_presence,
    loadChildren: () => import('../check-presence/check-presence.module').then(m => m.CheckPresenceModule),
    component: HomeBackgroundComponent
  },
  {
    path: AppRoutes.payment,
    loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule),
    component: HomeBackgroundComponent
  },
  {
    path: AppRoutes.end_shift,
    loadChildren: () => import('../end-shift/end-shift.module').then(m => m.EndShiftModule),
  },
  {
    path: AppRoutes.settings_employ,
    loadChildren: () => import('../settings-employ/settings-employ.module').then(m => m.SettingsEmployModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
