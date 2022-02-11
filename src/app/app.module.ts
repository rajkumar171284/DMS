import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LoginComponent} from './modules/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ErrorStateMatcher} from '@angular/material/core';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

import {sharedModule} from './shared.module';
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  declarations: [AppComponent,LoginComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,sharedModule],
  providers: [{ provide: ErrorStateMatcher, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
