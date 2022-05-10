import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-restaurant-admin',
  templateUrl: './edit-restaurant-admin.component.html',
  styleUrls: ['./edit-restaurant-admin.component.scss']
})
export class EditRestaurantAdminComponent implements OnInit {

  @Input() restaurant: Restaurant
  @Output() onSubmit = new EventEmitter<any>()

  form: FormGroup
  error: string

  constructor(private fb: FormBuilder, private as: AdminService) { }

  ngOnInit(): void {
    console.log(this.restaurant)
    this.form = this.fb.group({
      name: [this.restaurant.name, [
        Validators.required
      ]],
      address: [this.restaurant.address, [
        Validators.required
      ]],
      phoneNumber: [this.restaurant.phoneNumber, [
        Validators.required
      ]]
    })
  }

  submit(){
    this.restaurant.name = this.form.getRawValue().name
    this.restaurant.address = this.form.getRawValue().address
    this.restaurant.phoneNumber = this.form.getRawValue().phoneNumber

    this.as.editRestaurant(this.restaurant).subscribe(
      res => {
        this.onSubmit.emit()
      }, 
      err => {
        this.error = err.message;
      }
    )
  }

  cancel(){
    this.onSubmit.emit()
  }

}
