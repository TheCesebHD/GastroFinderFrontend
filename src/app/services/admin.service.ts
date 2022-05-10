import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<HttpResponse<any>>{
    return this.http.get(environment.server + environment.routes.adminRoutes.getAllUsers, {
      withCredentials: true,
      observe: 'response'
    })
  }

  editUser(params: any): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.adminRoutes.updateUser, params, {
      withCredentials: true,
      observe: 'response'
    })
  }

  editRestaurant(params: any): Observable<HttpResponse<any>>{
    console.log(params)
    return this.http.post(environment.server + environment.routes.adminRoutes.updateRestaurant, params, {
      withCredentials: true,
      observe: 'response'
    })
  }
}
