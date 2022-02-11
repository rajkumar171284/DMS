import { Component, OnInit } from '@angular/core';
import {deviceModel} from '../../../model/main.model'
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {
  deviceItems=new deviceModel();
  constructor() {
    console.log(this.deviceItems)
   }


  ngOnInit() {
  }

}
