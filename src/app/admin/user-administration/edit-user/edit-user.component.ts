import { Component, OnInit, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  restaurants: Array<Restaurant>
  form: FormGroup
  error: string

  @Input() user: User
  @Output() onSubmit = new EventEmitter<any>()

  constructor(private fb: FormBuilder, private as: AdminService, private rs: RestaurantService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.user.name, [
        Validators.required
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      isWirt: [this.user.isWirt, [
        Validators.required
      ]],
      isAdmin: [this.user.isAdmin, [
        Validators.required
      ]],
    })

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

  submit(){
    console.log(this.user.id)
    this.user.email = this.form.getRawValue().email
    this.user.name = this.form.getRawValue().name
    this.user.isWirt = this.form.getRawValue().isWirt
    this.user.isAdmin = this.form.getRawValue().isAdmin

    this.as.editUser(this.user).subscribe(
      res => {
        this.onSubmit.emit()
      },
      err => {
        alert("something went wrong!")
      }
    )
  }

  cancel(){
    this.onSubmit.emit()
  }
}