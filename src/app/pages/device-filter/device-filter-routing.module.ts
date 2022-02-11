import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceFilterPage } from './device-filter.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceFilterPageRoutingModule {}
