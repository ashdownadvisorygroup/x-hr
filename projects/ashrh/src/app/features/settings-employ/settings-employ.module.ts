import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsEmployComponent } from './settings-employ.component';

import { SettingsEmployRoutingModule } from '././settings-employ-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [SettingsEmployComponent],
  imports: [
    CommonModule,
    SettingsEmployRoutingModule,
    SharedModule,
    FeaturesSharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BsDatepickerModule.forRoot()
  ]
})
export class SettingsEmployModule {}
