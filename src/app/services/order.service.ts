import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order : Order){
    return this.http.post(environment.server + environment.routes.orderRoutes.create, order, {
      withCredentials: true,
      observe: 'response'
    })
  }
}
