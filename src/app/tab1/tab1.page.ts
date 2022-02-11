import { Component } from '@angular/core';
import {deviceModel} from '../../model/main.model'
import { ModalController } from '@ionic/angular';
import {DeviceFilterPage} from '../pages/device-filter/device-filter.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  deviceItems=new deviceModel();
  constructor(public modalController: ModalController) {
    console.log(this.deviceItems)
   }


   async callFilterModal(){
    
      const modal = await this.modalController.create({
        component: DeviceFilterPage
      });
      return await modal.present();
    
   }

}
