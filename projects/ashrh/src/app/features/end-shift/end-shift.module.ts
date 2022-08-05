import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EndShiftRoutingModule } from './end-shift-routing.module';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { EndShiftComponent } from './end-shift.component';
import { from } from 'rxjs';




@NgModule({
  declarations: [ EndShiftComponent ],
  imports: [
    CommonModule,
    SharedModule,
    EndShiftRoutingModule,
    FeaturesSharedModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class EndShiftModule { }
