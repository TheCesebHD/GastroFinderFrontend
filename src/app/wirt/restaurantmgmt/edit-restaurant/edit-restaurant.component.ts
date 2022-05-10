import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { WirtService } from 'src/app/services/wirt.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant
  @Output() onSubmit = new EventEmitter<any>()
  form: FormGroup

  constructor(private fb: FormBuilder, private ws: WirtService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.restaurant.name, [
        Validators.required,
      ]],
      address: [this.restaurant.address,[
        Validators.required,
      ]],
      phoneNumber: [this.restaurant.phoneNumber,[
        Validators.required
      ]]
    })
  }

  submit(){
    //since we do not allow the user to edit all properties (like ID) but still need them we just update the properties instead of creating a new restaurant object from the form data (form.getRawValue())
    this.restaurant.name = this.form.getRawValue().name
    this.restaurant.address = this.form.getRawValue().address
    this.restaurant.phoneNumber = this.form.getRawValue().phoneNumber

    this.ws.updateRestaurant(this.restaurant).subscribe(
      res => {
        this.onSubmit.emit()   //emit event to stop displaying component
      },
      err => {
        alert(err.message)
      }
    )
  }
  cancel(){
    this.onSubmit.emit()   //emit event to stop displaying component
  }

}
