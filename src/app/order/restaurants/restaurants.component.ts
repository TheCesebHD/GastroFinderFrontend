import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  restaurants : Array<Restaurant>
  filter: string

  constructor(private rs: RestaurantService) { }

  ngOnInit(): void {
    this.rs.getRestaurants().subscribe(
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
      },
      err => {
        this.ngOnInit()
      }
    )
  }
}