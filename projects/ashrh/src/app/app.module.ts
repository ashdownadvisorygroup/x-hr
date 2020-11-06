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

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
  ],
  declarations: [AppComponent, HomeBackgroundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
