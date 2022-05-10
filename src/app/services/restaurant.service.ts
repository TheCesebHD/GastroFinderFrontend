import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<HttpResponse<any>> {
    return this.http.post(environment.server + environment.routes.restaurantRoutes.getRestaurants, "", {
      withCredentials: true,
      observe: 'response'
    })
  }

  getMenu(restaurantID: String): Observable<HttpResponse<any>> {
    return this.http.post(environment.server + environment.routes.restaurantRoutes.getMenu, { 'restaurantID': restaurantID }, {
      withCredentials: true,
      observe: 'response'
    })
  }
}
