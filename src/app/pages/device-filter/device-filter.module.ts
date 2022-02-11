import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceFilterPageRoutingModule } from './device-filter-routing.module';

import { DeviceFilterPage } from './device-filter.page';
import {sharedModule} from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceFilterPageRoutingModule,sharedModule
  ],
  declarations: [DeviceFilterPage]
})
export class DeviceFilterPageModule {}
