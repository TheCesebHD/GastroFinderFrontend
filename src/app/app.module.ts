import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from './services/auth.service';
import { APP_INITIALIZER } from '@angular/core';
import { RestaurantsComponent } from './order/restaurants/restaurants.component';
import { OrderComponent } from './order/order/order.component';
import { RestaurantmgmtComponent } from './wirt/restaurantmgmt/restaurantmgmt.component';
import { WirtComponent } from './wirt/wirt.component';
import { RestaurantComponent } from './order/restaurant/restaurant.component';
import { EditRestaurantComponent } from './wirt/restaurantmgmt/edit-restaurant/edit-restaurant.component';
import { EditDishComponent } from './wirt/restaurantmgmt/edit-dish/edit-dish.component';
import { OrderviewComponent } from './wirt/restaurantmgmt/orderview/orderview.component';
import { UserAdministrationComponent } from './admin/user-administration/user-administration.component';
import { EditUserComponent } from './admin/user-administration/edit-user/edit-user.component';
import { RestaurantAdministrationComponent } from './admin/restaurant-administration/restaurant-administration.component';
import { RestaurantSearchPipe } from './admin/restaurant-administration/restaurant-search.pipe';
import { EditRestaurantAdminComponent } from './admin/restaurant-administration/edit-restaurant-admin/edit-restaurant-admin.component';
import { UserFilterPipe } from './admin/user-administration/user-filter.pipe';
import { DishFilterPipe } from './wirt/restaurantmgmt/dish-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    RestaurantsComponent,
    OrderComponent,
    RestaurantmgmtComponent,
    WirtComponent,
    RestaurantComponent,
    EditRestaurantComponent,
    EditDishComponent,
    OrderviewComponent,
    UserAdministrationComponent,
    EditUserComponent,
    RestaurantAdministrationComponent,
    RestaurantSearchPipe,
    EditRestaurantAdminComponent,
    UserFilterPipe,
    DishFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    WebsocketService,     
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        //return of(true).pipe(delay(5000));
      },
      deps: [AuthService, HttpClient],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }