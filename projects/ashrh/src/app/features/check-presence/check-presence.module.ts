import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckPresenceRoutingModule } from './check-presence-routing.module';
import { CheckPresenceComponent } from './check-presence.component';
import { SharedModule } from '../../shared/shared.module';

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
    FeaturesSharedModule,
    MatDialogModule
  ]
})
export class CheckPresenceModule {}
