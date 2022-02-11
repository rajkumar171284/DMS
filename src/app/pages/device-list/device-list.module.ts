import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceListPageRoutingModule } from './device-list-routing.module';

import { DeviceListPage } from './device-list.page';
import {sharedModule} from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceListPageRoutingModule,sharedModule
  ],
  declarations: [DeviceListPage]
})
export class DeviceListPageModule {}
