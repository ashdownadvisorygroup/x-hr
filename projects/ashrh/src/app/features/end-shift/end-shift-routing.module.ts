import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndShiftComponent } from './end-shift.component';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';

const routes: Routes = [
  {path: '', component: EndShiftComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FeaturesSharedModule
  ],
  exports: [RouterModule]
})
export class EndShiftRoutingModule { }
