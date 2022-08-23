import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskLeaveComponent } from './ask-leave/ask-leave.component';
import { LeaveRoutingModule } from './leave-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

import { FeaturesSharedModule } from '../../features-shared/features-shared.module';
//import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SimpleDatePickerComponent } from '../../../features/features-shared/simple-date-picker/simple-date-picker.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { DashCalendarComponent } from './calendar/dash-calendar/dash-calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

//import { FlatpickrModule } from 'angularx-flatpickr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AskLeaveComponent,
    CalendarHeaderComponent,
    DashCalendarComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    FeaturesSharedModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,

    // FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule,
    MatTabsModule,
    NgSelectModule,

    BsDatepickerModule.forRoot()
  ]
})
export class LeaveModuleModule {}

/*

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeProfilComponent,
    UpdateComponent,
    CreatedEmployeeComponent
  ],
  imports: [CommonModule, EmployeeRoutingModule, FeaturesSharedModule, SharedModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule,
      MatTableModule,
      MatSortModule,
      ReactiveFormsModule,
      MatTabsModule

  ]
})
export class EmployeeModule {}
*/
