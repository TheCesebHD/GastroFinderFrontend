import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { WirtService } from '../services/wirt.service';
import { WirtStoreService } from './wirt-store.service';

@Component({
  selector: 'app-wirt',
  templateUrl: './wirt.component.html',
  styleUrls: ['./wirt.component.scss']
})
export class WirtComponent implements OnInit {

  restaurants: Array<Restaurant>

  constructor(private ws : WirtService, private rs: RestaurantService, private router: Router, private store: WirtStoreService) { }

  ngOnInit(): void {
    this.ws.getOwnRestaurants().subscribe(
      res => {
        this.restaurants = res.body.map( (data: any)  => {

          let r : Restaurant = {
            id: data._id,
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            dishes: data.dishes,
          }
          return r
        })
      }
    )
  }

  navToRestaurant(r: Restaurant){
    this.store.addRestaurant(r)
    this.router.navigate(['/wirt/restaurantmgmt'])
  }

}
