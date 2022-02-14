import { Component,OnInit, OnChanges,DoCheck, SimpleChanges } from '@angular/core';
import {deviceModel} from '../../model/main.model'
import { ModalController } from '@ionic/angular';
import {DeviceFilterPage} from '../pages/device-filter/device-filter.page';

import { ApiRequestService } from '../api-request.service';
// import { ItemSliding } from '@ionic/a ';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnChanges,DoCheck{
  // deviceItems=new deviceModel();
  deviceItems:any[];
  constructor(public modalController: ModalController,private api:ApiRequestService) {
    console.log(this.deviceItems)
   }

   ngOnInit() {
    console.log('init')
   }
   ngOnChanges(changes: SimpleChanges): void {
       console.log('onc')
   }
   ngDoCheck(): void {
    console.log('tab docheck')
    this.getDeviceLogs()
   }
   getDeviceLogs(){
     this.api.getData().subscribe(res=>{
       console.log(res)
       this.deviceItems=res.data?res.data:[]
     })
     console.log(this.deviceItems)
   }

   async callFilterModal(){
    
      const modal = await this.modalController.create({
        component: DeviceFilterPage
      });
      return await modal.present();
    
   }
   editItem(item){

   }
   deleteItem(item){

   }
}
