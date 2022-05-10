import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserstoreService } from '../stores/userstore.service';

@Injectable({
  providedIn: 'root'
})
export class WirtGuard implements CanActivate {
  constructor(private store: UserstoreService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.getUser().pipe(
        map(res => {
          return res.isWirt
        })
      )
  }
}
