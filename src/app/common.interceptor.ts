import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

let apiurl = 'http://10.1.1.130:8081/';

const header = new HttpHeaders()
const option = {
  header: header
}

@Injectable()
export class commonInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;
    // const {username,password}=body;

    console.log(url)
    if (url == 'saveDevice') {

      const newReq = request.clone({
        url: apiurl + 'devices/add',
        headers: request.headers.set('Content-Type', 'application/json')
      })
      return next.handle(newReq);
    } 
    else {
      
      const newReq2 = request.clone({        
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      })
      return next.handle(newReq2);

    }
    // return next.handle(request);
  }
}
