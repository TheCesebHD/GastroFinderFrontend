import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { WirtGuard } from './guards/wirt.guard';
import { RestaurantsComponent } from './order/restaurants/restaurants.component';
import { OrderComponent } from './order/order/order.component';
import { RestaurantmgmtComponent } from './wirt/restaurantmgmt/restaurantmgmt.component';
import { WirtComponent } from './wirt/wirt.component';
import { AdminComponent } from './admin/admin.component';
import { UserAdministrationComponent } from './admin/user-administration/user-administration.component';
import { RestaurantAdministrationComponent } from './admin/restaurant-administration/restaurant-administration.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  //unprotected routes
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: ''},
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurants', component: RestaurantsComponent },

  //auth protected routes
  { path: 'order/:id', component: OrderComponent, canActivate: [AuthGuard]},

  //wirt only routes  //guards are commented out for development purposes
  { path: 'wirt', component: WirtComponent, /*canActivate: [AuthGuard, WirtGuard]*/},
  { path: 'wirt/restaurantmgmt', component: RestaurantmgmtComponent, /*canActivate: [AuthGuard, WirtGuard]*/ },

  //admin protected routes
  //todo: Implement admin guard
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/user-administration', component: UserAdministrationComponent },
  { path: 'admin/restaurant-administration', component: RestaurantAdministrationComponent },

  //404 path, must always be last
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
