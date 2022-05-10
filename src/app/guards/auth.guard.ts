import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserstoreService } from '../stores/userstore.service';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private userstore: UserstoreService, private router: Router){
    console.trace('AuthGuard initialized!');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
    return this.userstore.getIsLoggedIn().pipe(
      map(
        res => {
          if(!res){
            this.router.navigate(['/login'])
          }
          return res
        }
      )
    )
  }
}
