import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, mapTo } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';


/* 
Todo: use shop instead of injecting the singleton service with its properties
https://www.learnrxjs.io/
*/


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(protected http: HttpClient) { 
    console.trace("initialised auth service")
  }

  tryRegister(data : any): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.authRoutes.register, data, {
      withCredentials: true,
      observe: 'response'
    })
  }

  tryLogin(data : any): Observable<HttpResponse<any>> {
    return this.http.post(environment.server + environment.routes.authRoutes.login, data, {
      withCredentials: true,
      observe: 'response'
    })
  }
  
  tryLogout(): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.authRoutes.logout, "", {
      withCredentials: true,
      observe: 'response'
    })
  }
}