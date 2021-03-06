import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../../shared/shared.module';
import { UpdateComponent } from './update/update.component';
import { EmployeProfilComponent } from './employe-profil/employe-profil.component';
import { CreatedEmployeeComponent } from './created-employee/created-employee.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeProfilComponent,
    UpdateComponent,
    CreatedEmployeeComponent
  ],
  imports: [CommonModule, EmployeeRoutingModule, FeaturesSharedModule, SharedModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule]
})
export class EmployeeModule {}
