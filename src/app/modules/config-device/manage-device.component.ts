import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { deviceModel, cityGroup, newDeviceParams, DeviceParams } from '../../../model/main.model';
import { startWith, map } from 'rxjs/operators';

import { ApiRequestService } from '../../api-request.service';
const model = new deviceModel();

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

const IPPattern = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"

@Component({
  selector: 'app-config-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.scss'], providers: [FormBuilder]
})
export class ConfigDeviceComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiRequestService) {


  }
  newDevice = this.fb.group({
    type: ['', Validators.required],
    deviceArray: this.fb.array([], this.isNameDup())
  })
  setDevice = this.fb.group({
    name: ['', Validators.required],
    IP: ['10.1.1.139', Validators.required],
    mac_address: ['', Validators.required],
    loc: ['', Validators.required]
  })
  deviceTypes = model.deviceTypes;
  citiesOpt: Observable<string[]>;
  newCities: string[];
  reqParams: newDeviceParams = new DeviceParams();
  ngOnInit() {
    this.add();

    this.api.formatCities().subscribe(cities => {
      console.log(cities)
      this.newCities = cities;


    })

    
    this.citiesOpt = this.setDevice.get('loc').valueChanges.pipe(startWith(''), map(value => this._filterGroup(value)),);
    console.log(this.citiesOpt)
  }
  private _filterGroup(value: string): string[] {
    console.log('v:', value)
    if (value) {
      const filterValue = value.toLowerCase();
      return this.newCities.filter(item => item.toLowerCase().includes(filterValue));
    }
    return this.newCities;
  }

  get deviceArray(): FormArray {
    return this.newDevice.get('deviceArray') as FormArray
  }
  add() {
    const group = this.fb.group({
      name: ['', Validators.required],
      IP: ['10.1.1.139', Validators.compose([Validators.required, Validators.pattern(IPPattern)])],
      mac_address: ['', Validators.required],
      loc: ['', Validators.required]
    })
    this.deviceArray.push(group)
  }
  isNameDup() {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value);
      const names = totalSelected.map(value => value.name)
      const hasDuplicate = names.some(
        (name, index) => names.indexOf(name, index + 1) != -1
      );
      return hasDuplicate ? { duplicate: true } : null;
    }
    return validator;
  }
  setDeviceData() {
    console.log(this.newDevice, this.newDevice.valid)

    if (this.newDevice.valid) {

      const arr = this.newDevice.get('deviceArray') as FormArray;

      this.reqParams.device_model = this.newDevice.get('type').value;
      // array
      this.reqParams.device_name = arr.controls.map(ele => ele.value.name);
      this.reqParams.device_ip = arr.controls.map(ele => ele.value.IP);
      this.reqParams.device_mac_address = arr.controls.map(ele => ele.value.mac_address);
      this.reqParams.location = arr.controls.map(ele => ele.value.loc);


      // set loader
      // call api
      console.log(this.reqParams)
      // this.api.setDeviceDetails(this.reqParams,'saveDevice').subscribe(res => {
      //   console.log(res)
      // })
    }
  }

}
