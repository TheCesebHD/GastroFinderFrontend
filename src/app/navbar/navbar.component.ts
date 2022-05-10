import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../stores/userstore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private userstore: UserstoreService) { }

  user$: Observable<User>
  isLoggedIn$: Observable<boolean>

  ngOnInit(): void {
    this.user$ = this.userstore.getUser()
    this.isLoggedIn$ = this.userstore.getIsLoggedIn()
  }

  logout(){
    this.auth.tryLogout().subscribe(
      res => {
        this.userstore.deleteUser()
        this.userstore.setIsLoggedIn(false)
      },
      err =>{
        alert("something went wrong")
      }
    )
  }
}
