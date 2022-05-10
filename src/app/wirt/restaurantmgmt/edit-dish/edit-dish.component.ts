import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Dish } from 'src/app/interfaces/dish';
import { WirtService } from 'src/app/services/wirt.service';
import { WirtStoreService } from '../../wirt-store.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {

  //this component is used to create and update a dish

  isInCreateMode: boolean = false //indicates the state of the component. Create is used to create a dish, update to update it

  @Input() dish?: Dish  //non mandatory parameter
  @Input() restaurantID: string
  @Output() onSubmit = new EventEmitter<any>()

  form: FormGroup

  constructor(private fb: FormBuilder, private ws: WirtService, private store: WirtStoreService) { }

  ngOnInit(): void {

    if(!this.dish){ //no dish was provided as an argument so we want to create a new dish
      this.isInCreateMode = true //lets our submit method know that it should create a new dish instead of updating an existing one
      this.dish = {
        id: '',
        name: '',
        price: 0,
        delivery: false,
        description: ''
      }
    }

    this.form = this.fb.group({
      name: [this.dish.name, [
        Validators.required,
      ]],
      price: [this.dish.price,[
        Validators.required,
      ]],
      description: [this.dish.description,[
        Validators.required
      ]],
      delivery: [this.dish.delivery,[
        Validators.required
      ]]
    })
  }
  submit(){
    //we dont let the user edit the ID so we need to set the properties instead of saving form.getRawValue() to a Dish (otherwise the ID would be undefined)
    if(this.dish){
      this.dish.name = this.form.getRawValue().name
      this.dish.description = this.form.getRawValue().description
      this.dish.price = this.form.getRawValue().price
      this.dish.delivery = this.form.getRawValue().delivery
  
      if(this.isInCreateMode){  //create a new dish
        this.ws.createDish(this.dish, this.restaurantID).subscribe(
          res => {
            this.onSubmit.emit() //triggered here instead of at the end of the func on purpose
          },
          err => {
            console.log(err)
          }
        )
      }
      else{   //update existing dish
        this.ws.updateDish(this.dish, this.restaurantID).subscribe(
          res => {
            this.onSubmit.emit()
          }, 
          err => {
            console.log(err)
          }
        )
      }
    }
  }
  cancel(){
    this.onSubmit.emit()
  }
}