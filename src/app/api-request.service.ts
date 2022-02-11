import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { newDeviceParams } from './../model/main.model';

import { deviceModel } from '../model/main.model';

const model = new deviceModel();
const cityList = model.cityJSON;

let apiurl = 'http://10.1.1.130:8081/';

const url = apiurl + 'devices/add';
const header = new HttpHeaders()
header.append('Content-Type', 'application/json');
header.append("Access-Control-Allow-Headers", "authorization, content-type");
header.append('Access-Control-Allow-Origin', 'http://localhost:4200');
header.append('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
const option = {
  headers: header
}

interface newData {
  list: any;
  data: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  private newSubject = new Subject<any>();
  // private newSubject2 = new Subject<newData>();
  newCities: any = [];
  constructor(private http: HttpClient) {

    // this.newCities=[];
    // cityList.states.map(res => {
    //   res.districts.map(group => this.newCities.push(group));
    // })
    // this.sendCities(this.newCities);
  }


  formatCities(): Observable<any> {
    
    let newArr:any = [];
    cityList.states.map(res => {
      res.districts.map(group => newArr.push(group));
    })
    return of(newArr);

    // this.sendCities(this.newCities);11111111
  }

  setDeviceDetails(params: newDeviceParams, label: string): Observable<any> {
    return this.http.post(label, params, option).pipe(map(res => res));
  }

  sendCities(data: any) {
    this.newSubject.next({ list: data })
  }
  sendData(data: any) {
    // this.newSubject2.next({ list: data,data:'' })
  }

  getCityies(): Observable<any> {
    return this.newSubject.asObservable();
  }
  clearCityList() {
    this.newSubject.next()
  }

  public _filterGroup(list:string[],value: string): string[] {
    if (value) {
      console.log(value)
      const filterValue = value.toLowerCase();
      return list.filter(item => item.toLowerCase().includes(filterValue));
    }
    return list;
  }
}
