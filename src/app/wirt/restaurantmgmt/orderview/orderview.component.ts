import { Component, Input, OnInit, Output } from '@angular/core';
import { FullOrder } from 'src/app/interfaces/full-order';
import { WirtService } from 'src/app/services/wirt.service';
import { EventEmitter } from '@angular/core';
import { AmountDish } from 'src/app/interfaces/selected-dish';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.scss']
})
export class OrderviewComponent implements OnInit {

  @Input() restaurantID: string
  @Output() onSubmit = new EventEmitter<any>()

  orders: Array<FullOrder>

  constructor(private ws: WirtService) { }

  ngOnInit(): void { 
    this.ws.getOrderHistory(this.restaurantID).subscribe(
      res => {  //convert the JSON res to an arr of orders
        this.orders = res.body.map( (data : any) => {
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
      },
      err => {
        console.log(err)
      }
    )
  }

  exit(){
    this.onSubmit.emit()
  }

}