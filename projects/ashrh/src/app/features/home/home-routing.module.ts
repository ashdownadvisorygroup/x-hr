import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AllmodulesComponent } from './allmodules/allmodules.component';
import { AppRoutes } from '../../modeles/app-routes';
import { HomeBackgroundComponent } from '../../utilities-components/home-background/home-background.component';
import { AuthGuard } from '../authentification/auth/auth.guard';
import { DashCalendarComponent } from '../leaves/leave-module/calendar/dash-calendar/dash-calendar.component';

const routes: Routes = [
  { path: '', component: AllmodulesComponent },
  {
    path: AppRoutes.employees,
    loadChildren: () =>
      import('../employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.check_presence,
    loadChildren: () =>
      import('../check-presence/check-presence.module').then(
        (m) => m.CheckPresenceModule
      ),
    component: HomeBackgroundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.payment,
    loadChildren: () =>
      import('../payment/payment.module').then((m) => m.PaymentModule),
    component: HomeBackgroundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.end_shift,
    loadChildren: () =>
      import('../end-shift/end-shift.module').then((m) => m.EndShiftModule),
    canActivate: [AuthGuard]
  },

  {
    path: AppRoutes.leaves,
    loadChildren: () =>
      import('../leaves/leave-module/leave-module.module').then(
        (m) => m.LeaveModuleModule
      ),
    canActivate: [AuthGuard]
  },
  //leave_dashboard
  {
    path: AppRoutes.leaves_dashboard,
    loadChildren: () =>
      import('../leaves/leave-module/leave-module.module').then(
        (m) => m.LeaveModuleModule
      ),
    component: DashCalendarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.settings_employ,
    loadChildren: () =>
      import('../settings-employ/settings-employ.module').then(
        (m) => m.SettingsEmployModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
