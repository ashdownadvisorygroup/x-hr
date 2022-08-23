import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { EndShiftComponent } from './features/end-shift/end-shift.component';
import { HomeBackgroundComponent } from './utilities-components/home-background/home-background.component';
import { SettingsEmployComponent } from './features/settings-employ/settings-employ.component';
import { PaymentComponent } from './features/payment/payment.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './features/dialog/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './features/authentification/auth/auth.guard';
import { DialogAddLeavesComponent } from './features/leaves/Dialogue/dialog-add-leaves/dialog-add-leaves.component';

import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// import { MatDatepickerModule } from '@angular/material';

// import {
//   MatNativeDateModule,
//   MatFormFieldModule } from '@angular/material';

import { NgSelectModule } from '@ng-select/ng-select';
import 'hammerjs';
import { DialogLeaveInfoComponent } from './features/leaves/Dialogue/dialog-leave-info/dialog-leave-info.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { DatePipe } from '@angular/common';

import { CalendarHeaderComponent } from '../app/features/leaves/leave-module/calendar/calendar-header/calendar-header.component';
import { DashCalendarComponent } from '../app/features/leaves/leave-module/calendar/dash-calendar/dash-calendar.component';
import { LeaveModuleModule } from './features/leaves/leave-module/leave-module.module';

/*
import {
  MatPaginatorModule, MatSortModule} from '@angular/material';

@NgModule({
  exports : [

    MatSortModule,
  MatPaginatorModule,
  ]
})
*/

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatIconModule,
    MatTableModule,
    ScrollingModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    //  LeaveModuleModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],

  providers: [AuthGuard, DatePipe],
  declarations: [
    AppComponent,
    HomeBackgroundComponent,
    DialogComponent,
    DialogAddLeavesComponent,
    DialogLeaveInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
