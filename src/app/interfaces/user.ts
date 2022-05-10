import { RestaurantmgmtComponent } from "../wirt/restaurantmgmt/restaurantmgmt.component";
import { Restaurant } from "./restaurant";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    isWirt: boolean,
    isAdmin: boolean,
    restaurants: Array<Restaurant> | undefined
}
