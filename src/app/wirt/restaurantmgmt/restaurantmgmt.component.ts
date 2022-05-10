import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { WirtStoreService } from '../wirt-store.service';
import { Validators } from '@angular/forms';
import { Dish } from 'src/app/interfaces/dish';
import { WirtService } from 'src/app/services/wirt.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Order } from 'src/app/interfaces/order';
import { FullOrder } from 'src/app/interfaces/full-order';
import { AmountDish } from 'src/app/interfaces/selected-dish';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurantmgmt',
  templateUrl: './restaurantmgmt.component.html',
  styleUrls: ['./restaurantmgmt.component.scss']
})
export class RestaurantmgmtComponent implements OnInit {

  //*****************************************************************************************************/
  // this component (including its childs) can be confusing. 
  // the wirt mgmt paragraph in the Angular section of the docs explains the idea behind its architecture
  //*****************************************************************************************************/


  //booleans to determine when to display the child components
  showEditRestaurant: boolean
  showEditDish: boolean
  showViewOrder: boolean

  filter: string  //the filter parameter for the search pipe

  dish: Dish | undefined  //the dish that gets passed down to the child component

  restaurant: Restaurant  //the current restaurant

  dishes : Array<Dish>    //menu
  activeOrders : Array<FullOrder>

  constructor(private store: WirtStoreService, private fb: FormBuilder, private rs: RestaurantService, private ws: WirtService) { }

  ngOnInit(): void {
    this.store.restaurant.subscribe( res => { //get restaurant object from wirt store service
      this.restaurant = res
    })

    this.getMenu()
    this.getActiveOrders()
  }

  getMenu(){  //calls wirtService to get the menu of the selected restaurant and saves it to an array of dishes
    this.rs.getMenu(this.restaurant.id).subscribe( //populate dishes arr from http response
      res => {
        this.dishes = res.body.map( (data: any) => {  //since the http res is JSON we need to convert it to an array of dishes
          let d: Dish = {
            id: data._id,
            name: data.name,
            price: data.price,
            description: data.description,
            delivery: data.delivery,
          }
          return d
        })
      },
      err => {
      }
    )
  }

  getActiveOrders(){  //calls wirtService to get the active orders of the selected restaurant and saves it to an array of orders
    this.ws.getActiveOrders(this.restaurant.id).subscribe(
      res => {  //convert the JSON res to an arr of orders
        this.activeOrders = res.body.map( (data : any) => {
          let o: FullOrder = {
            restaurantID: data.restaurant,
            price: data.price,
            //populate the order.dishes array
            dishes: data.dishes.map( (data: AmountDish) => {
              let dishAmount: AmountDish = {
                dish: {
                  id: data.dish.id,
                  price: data.dish.price,
                  name: data.dish.name,
                  description: data.dish.description,
                  delivery: data.dish.delivery
                },
                amount: data.amount
              }
              return dishAmount

            }),

            comment: data.comment,
            id: data._id,
            userID: data.user,
            status: data.status,
            timestamp: data.timestamp
          }
          return o
        })
        console.table(this.activeOrders)
      },
      err => {
        console.log(err)
      }
    )
  }

  showEditRestaurantComponent(){  //set showEditRestaurant to true to display the child edit-restaurant component
    this.showEditRestaurant = true
  }

  hideEditRestaurantComponent(){   //hides the edit restaurant component
    this.showEditRestaurant = false
  }

  showEditDishComponent(){ //shows the add dish component
    this.showEditDish = true
  }

  showEditDishComponentEditMode(d: Dish){  //passes the dish object to the component so it edits the dish instead of creating a new one
    this.dish = d
    this.showEditDishComponent()
  }

  hideEditDishComponent(){
    this.showEditDish = false
    this.dish = undefined
    this.getMenu() //refreshes the list of dishes //todo: consider using Output instead of sending a new http call
  }

  showOrderHistory(){
    this.showViewOrder = true
  }

  hideOrderHistory(){
    this.showViewOrder = false
  }

  deactivateDish(d: Dish){
    this.ws.deactivateDish(d, this.restaurant.id).subscribe(
      res => {
        let index = this.dishes.indexOf(d); //if http call was successfull, delete entry from array
        this.dishes.splice(index, 1)
      }, 
      err => {
        console.log(err.body)
      })
  }

  markOrderAsCompleted(o: FullOrder){
    this.ws.markOrderAsCompleted(o.id, this.restaurant.id).subscribe(
      res => {
        let idx: number = this.activeOrders.indexOf(o)
        this.activeOrders.splice(idx, 1)
      }
    )
  }
}
