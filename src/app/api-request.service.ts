import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { newDeviceParams } from './../model/main.model';

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
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  setDeviceDetails(params: newDeviceParams, label: string): Observable<any> {
    return this.http.post(label, params, option).pipe(map(res => res));
  }

}
