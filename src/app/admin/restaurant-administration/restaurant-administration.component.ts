import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-administration',
  templateUrl: './restaurant-administration.component.html',
  styleUrls: ['./restaurant-administration.component.scss']
})
export class RestaurantAdministrationComponent implements OnInit {

  restaurants: Array<Restaurant>
  restaurant: Restaurant //for child component
  filter: string  //filter string for the pipe
  showEditRestaurantAdmin: boolean = false;

  constructor(private rs: RestaurantService) { }

  ngOnInit(): void {  
    this.rs.getRestaurants().subscribe( //populate restaurants array
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

  displayEditRestaurantAdmin(restaurant: Restaurant){
    this.restaurant = restaurant
    this.showEditRestaurantAdmin = true
  }

  hideEditRestaurantAdmin(){
    this.showEditRestaurantAdmin = false
  }
}
