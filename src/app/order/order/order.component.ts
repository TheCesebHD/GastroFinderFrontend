import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Dish } from 'src/app/interfaces/dish';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { Order } from 'src/app/interfaces/order';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { AmountDish } from 'src/app/interfaces/selected-dish';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  AmountDishes: Array<AmountDish> = []  //instead of using an arr of dishes we use AmountDishes to store the amount of the selected dishes since this is easier
  order: Order
  restaurantID: string
  comment: string = ""


  constructor(private rs: RestaurantService, private route: ActivatedRoute, private os: OrderService) { }

  ngOnInit(): void {

    this.restaurantID = this.route.snapshot.paramMap.get('id') || ''    //since get returns string || null we need to add a string as fallback/default value
    this.rs.getMenu(this.restaurantID).subscribe( //get data from http req
      res => {
        this.AmountDishes = res.body.map( (data: any) => {  	//poplulate amountDishes array
          let d : AmountDish = {
            dish: {
              id: data._id,
              name: data.name,
              price: data.price,
              description: data.description,
              delivery: data.delivery,
            },
            amount: 0
          }
          return d
        })
      },
      err => {

      }
    )
    
  }

  addAmountDish(d: AmountDish){
    d.amount++;
  }
  
  removeAmountDish(d: AmountDish){
    if(d.amount > 0){
      d.amount--;
    }
  }

  calculatePrice(): number{
    let price: number = 0;
    this.AmountDishes.forEach(d => {
      for(let i = 0; i < d.amount; i++){
        price += d.dish.price
      }
    })
    return price;
  }

  submit(){
    //get all dish ids from AmountDishes with an amount > 0 (the dishes the user selected)
    let dishes: Array<AmountDish> = this.AmountDishes.filter(d => d.amount > 0)

    if(dishes[0] == undefined){ //check if order is valid
      alert('Ihre bestellung ist leer')
    }
    else{
      this.order = {  //Create order
        restaurantID: this.restaurantID,
        comment: this.comment,
        dishes: dishes.map(e => {
          let obj = {
            amount: e.amount,
            id: e.dish.id
          }
          return obj
        })
      }
      this.os.createOrder(this.order).subscribe(
        res => {  //os stands for orderService
          alert(res.status + " : " + res.body)
        },
        err => {
          alert(err)
        })
    }
  }
}
