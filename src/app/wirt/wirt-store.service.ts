import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant';

//this store is not in ./app/stores since it will not be used globally

@Injectable({
  providedIn: 'root'
})
export class WirtStoreService {

  private readonly _restaurant = new BehaviorSubject<Restaurant>({
    id: '',
    name: '',
    address: '',
    phoneNumber: '',
    dishes: []
  });

  restaurant = this._restaurant.asObservable()

  addRestaurant(r: Restaurant){
    this._restaurant.next(r)
  }

}
