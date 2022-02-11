import { Component } from '@angular/core';
import {deviceModel} from '../../model/main.model'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  deviceItems=new deviceModel();
  constructor() {
    console.log(this.deviceItems)
   }

}
