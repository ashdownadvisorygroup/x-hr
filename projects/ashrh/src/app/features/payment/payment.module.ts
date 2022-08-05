import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component'

import { PaymentRoutingModule } from './payment-routing.module'
import { SharedModule } from '../../shared/shared.module';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    FeaturesSharedModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class PaymentModule { }
