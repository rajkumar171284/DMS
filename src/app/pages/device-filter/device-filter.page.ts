import { Component, OnInit } from '@angular/core';
import { DeviceFilter, deviceModel } from '../../../model/main.model';
import { FormArray, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Platform } from '@ionic/angular';

import { ApiRequestService } from '../../api-request.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-device-filter',
  templateUrl: './device-filter.page.html',
  styleUrls: ['./device-filter.page.scss'],
  providers: [FormBuilder]
})
export class DeviceFilterPage implements OnInit {
  deviceType = new deviceModel();
  deviceRow: DeviceFilter;

  constructor(private pt: Platform, private fb: FormBuilder, private api: ApiRequestService,public modalController: ModalController) {

    // this.api.getCityies().subscribe(res => {
    //   console.log(res)
    // })
  }
  
  filterGroup = this.fb.group({
    device_type: ['', Validators.required],
    loc: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
  })
  newCities: any = [];
  citiesOpt: Observable<any>;
  ngOnInit() {
    this.api.formatCities().subscribe(list => this.newCities = list)
    this.citiesOpt = this.filterGroup.get('loc')!.valueChanges.pipe(startWith(''), map(value => this._filterGroup(value)),);
    console.log(this.deviceType)
  }
  private _filterGroup(value: string): string[] {
    console.log('v:', value)
    if (value) {
      const filterValue = value.toLowerCase();
      return this.newCities.filter(item => item.toLowerCase().includes(filterValue));
    }
    return this.newCities;
  }
  validateFilterParams() {
    // const totalSelected:ValidatorFn=(formArr:FormArray)=>{
    //   const selectedValue=formArr.controls.map(value=>value)
    // }
  }
  filter(){
    if(this.filterGroup.valid){

      this.api.sendData({
        
      })
    }
  }

  close(){
    this.modalController.dismiss()
  }
}
