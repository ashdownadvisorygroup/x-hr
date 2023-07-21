import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckPresenceRoutingModule } from './check-presence-routing.module';
import { CheckPresenceComponent } from './check-presence.component';
import { SharedModule } from '../../shared/shared.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CheckArriveComponent } from './check-arrive/check-arrive.component';
import { CheckDepartComponent } from './check-depart/check-depart.component';
import { CallPresentationComponent } from './call-presentation/call-presentation.component';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ListPresenceComponent } from './list-presence/list-presence.component';
import { DialogPresenceInfoComponent } from './dialog-presence-info/dialog-presence-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CheckPresenceComponent,
    CheckArriveComponent,
    CheckDepartComponent,
    CallPresentationComponent,
    ListPresenceComponent,
    DialogPresenceInfoComponent
  ],
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BsDatepickerModule.forRoot(),
    CommonModule,
    SharedModule,
    CheckPresenceRoutingModule,
    ZXingScannerModule,
    FeaturesSharedModule,
    MatDialogModule
  ]
})
export class CheckPresenceModule {}
