import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {

  constructor(private as: AdminService) { }
  
  selectedUser: User
  users : Array<User>
  filter: string
  showEditUserComponent = false;

  ngOnInit(): void {
    this.as.getAllUsers().subscribe(res => {
      this.users = res.body.map( (data: any)  => {
        let usr : User = {
          id: data._id,
          name: data.name,
          email: data.email,
          password: "",
          isWirt: data.isWirt,
          isAdmin: data.isAdmin,
          restaurants: data.restaurants.map( (params: any) => {
            let restaurant = {
              id: params._id,
              name: params.name,
              address: params.address,
              phoneNumber: params.address,
              dishes: undefined
            }
            return restaurant
          })
        }
        console.log(usr)
        return usr;
      })
      console.log(this.users)
    })
  }

  showEditUser(user: User){
    this.selectedUser = user
    this.showEditUserComponent = true
  }

  hideEditUser(){
    this.showEditUserComponent = false
  }
}
