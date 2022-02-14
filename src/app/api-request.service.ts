import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { newDeviceParams, DeviceFilter } from './../model/main.model';

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
  private Subject = new Subject<any>();
  newCities: any = [];
  constructor(private http: HttpClient) {

  }


  formatCities(): Observable<any> {

    let newArr: any = [];
    cityList.states.map(res => {
      res.districts.map(group => newArr.push(group));
    })
    return of(newArr);
  }

  // add or edit device Api- 
  setDeviceDetails(params: newDeviceParams, label: string): Observable<any> {
    // were 'label' as add or edit- interceptor will overwrite original api name
    return this.http.post(label, params, option).pipe(map(res => res));
  }
  // list all devices api
  getAllDevice(params: any) {
    console.log('ddsd', params)

    return this.http.post(environment.apiURL + 'devices/showlog', params).pipe(map(res => res));

  }

  sendCities(data: any) {
    this.newSubject.next({ list: data })
  }
  sendData(data: any, req: number) {
    this.Subject.next({ data: data, request: req })
  }

  getData(): Observable<any> {
    return this.Subject.asObservable();
  }

  getCityies(): Observable<any> {
    return this.newSubject.asObservable();
  }
  clearCityList() {
    this.newSubject.next()
  }

  public _filterGroup(list: string[], value: string): string[] {
    if (value) {
      console.log(value)
      const filterValue = value.toLowerCase();
      return list.filter(item => item.toLowerCase().includes(filterValue));
    }
    return list;
  }
}
