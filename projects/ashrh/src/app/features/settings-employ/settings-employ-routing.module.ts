import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsEmployComponent } from './settings-employ.component';

const routes: Routes = [
  {path: '', component: SettingsEmployComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsEmployRoutingModule { }
