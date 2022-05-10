import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {

  private readonly _user = new BehaviorSubject<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    isWirt: false,
    restaurants: undefined
  });

  private readonly _isLoggedIn = new BehaviorSubject<boolean>(false)
  
  getUser(){
    return this._user.asObservable()
  }

  updateUser(u: User){
    this._user.next(u)
  }

  deleteUser(){
    this._user.next({
      id: '',
      name: '',
      email: '',
      password: '',
      isWirt: false,
      isAdmin: false,
      restaurants: undefined
    })
  }

  getIsLoggedIn(){
    return this._isLoggedIn.asObservable()
  }

  setIsLoggedIn(b: boolean){
    this._isLoggedIn.next(b)
  }

}
