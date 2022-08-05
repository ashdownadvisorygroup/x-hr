import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { EndShiftComponent } from './features/end-shift/end-shift.component';
import { HomeBackgroundComponent } from './utilities-components/home-background/home-background.component';
import { SettingsEmployComponent } from './features/settings-employ/settings-employ.component';
import { PaymentComponent } from './features/payment/payment.component';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './features/dialog/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/*
import {
  MatPaginatorModule, MatSortModule} from '@angular/material';

@NgModule({
  exports : [

    MatSortModule,
  MatPaginatorModule,
  ]
})
*/

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    ScrollingModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
  ],
  declarations: [AppComponent, HomeBackgroundComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
