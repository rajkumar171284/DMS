import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './modules/login/login.component';
const routes: Routes = [
  {
   path:'',component:LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'device-list',
    loadChildren: () => import('./pages/device-list/device-list.module').then( m => m.DeviceListPageModule)
  },
  {
    path: 'device-filter',
    loadChildren: () => import('./pages/device-filter/device-filter.module').then( m => m.DeviceFilterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
