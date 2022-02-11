import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DeviceListPage} from '../pages/device-list/device-list.page';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit,OnChanges {
  @Input() name: string|number;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes.name.currentValue)
      this.presentModal(changes.name.currentValue);
  }

  async presentModal(page) {
   
    if(this.name==0){
      
      const modal = await this.modalController.create({
        component: DeviceListPage
      });
      return await modal.present();
    }
    
    
  }

}
