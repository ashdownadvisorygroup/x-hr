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


@NgModule({
  declarations: [CheckPresenceComponent, CheckArriveComponent, CheckDepartComponent, CallPresentationComponent],
  imports: [
    CommonModule,
    SharedModule,
    CheckPresenceRoutingModule,
    ZXingScannerModule,
    FeaturesSharedModule
  ]
})
export class CheckPresenceModule { }
