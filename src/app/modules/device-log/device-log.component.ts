import { Component, OnInit, OnChanges, DoCheck, SimpleChanges,HostListener,Input } from '@angular/core';
import { ApiRequestService } from 'src/app/api-request.service';
import { DeviceFilter, deviceModel } from '../../../model/main.model';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-device-log',
  templateUrl: './device-log.component.html',
  styleUrls: ['./device-log.component.scss'],
})
export class DeviceLogComponent implements OnInit, OnChanges, DoCheck {
  @Input() name:string;
  loading: any;
  constructor(private api: ApiRequestService, public loadingController: LoadingController) { }

  
  ngOnInit() {
    this.pageLoad()
  }
  pageLoad(){
    console.log('device log pageLoad',this.name)
    if(this.name==='onLoad'){
      console.log('device log pageLoad',this.name)

      const newParams: DeviceFilter = {
        device_type: '',
        start_date: '',
        end_date: '',
        location: '',
      }
      this.loadAllDevice(newParams)
      // this.api.sendData(newParams, 1)
      // return;
    }
    this.api.getData().subscribe(res => {

      console.log(res)
      if (res.data && res.request==1) {
        this.loading = this.loadingController.create({
          message: 'Fetching records',
          // duration: 5000
        }).then(() => {
          this.loadAllDevice(res.data)
        })
      }

    },(err)=>{
      console.log('err',err)
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    
  }
  ngDoCheck() {
    console.log('do')
  }

  loadAllDevice(params: DeviceFilter) {
    // loader
    console.log("params")
    this.api.getAllDevice(params).subscribe(response => {
      if (response) {
        console.log(response)
        this.api.sendData(response, 0)
      }

      // this.loading.onDidDismiss()
    })
  }

}
