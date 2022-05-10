import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../interfaces/restaurant';
import { Dish } from '../interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class WirtService {

  constructor(private http: HttpClient) { }

  getOwnRestaurants(): Observable<HttpResponse<any>> {
    return this.http.post(environment.server + environment.routes.wirtRoutes.getOwnRestaurants, "", {
      withCredentials: true,
      observe: 'response'
    })
  }

  updateRestaurant(restaurant: Restaurant): Observable<HttpResponse<any>> {
    return this.http.post(environment.server + environment.routes.wirtRoutes.updateRestaurant, restaurant, {
      withCredentials: true,
      observe: 'response'
    })
  }

  deactivateDish(d: Dish, id: string): Observable<HttpResponse<any>>{
    //we do not need an interface for the http req body since it is only used once
    //therefore we need to create a new object because deleteDish also needs the restaurantID as a parameter
    let reqBody = {
      dishID: d.id,
      restaurantID: id
    }

    return this.http.post(environment.server + environment.routes.wirtRoutes.removeDish, reqBody, {
      withCredentials: true,
      observe: 'response'
    })
  }

  createDish(d: Dish, id: string): Observable<HttpResponse<any>>{
    let reqBody = {
      name: d.name,
      price: d.price,
      description: d.description,
      delivery: d.delivery,
      restaurantID: id,
      isActive: true //dishes are set to isActive on default and their state can only be changed in the restaurantmgmt components dish list
    }
    return this.http.post(environment.server + environment.routes.wirtRoutes.createDish, reqBody, {
      withCredentials: true,
      observe: 'response'
    })
  }

  updateDish(d: Dish, id: string): Observable<HttpResponse<any>>{
    let reqBody = {
      dishID: d.id,
      name: d.name,
      price: d.price,
      description: d.description,
      delivery: d.delivery,
      restaurantID: id,
      isActive: true //dishes are set to isActive on default and their state can only be changed in the restaurantmgmt components dish list
    }
    return this.http.post(environment.server + environment.routes.wirtRoutes.updateDish, reqBody, {
      withCredentials: true,
      observe: 'response'
    })
  }

  getActiveOrders(restaurantID: string): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.wirtRoutes.getActiveOrders, {restaurantID}, {
      withCredentials: true,
      observe: 'response'
    })
  }

  markOrderAsCompleted(orderID: string, restaurantID: string): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.wirtRoutes.markOrderAsCompleted, {
      orderID: orderID,
      restaurantID: restaurantID
    }, {
      withCredentials: true,
      observe: 'response'
    })
  }

  getOrderHistory(restaurantID: string): Observable<HttpResponse<any>>{
    return this.http.post(environment.server + environment.routes.wirtRoutes.getOrderHistory, {restaurantID}, {
      withCredentials: true,
      observe: 'response'
    })
  }
}
