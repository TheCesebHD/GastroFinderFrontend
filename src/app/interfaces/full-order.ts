import { Dish } from "./dish";
import { Order } from "./order";
import { AmountDish } from "./selected-dish";

//this interface contains the entire order data from the db (e.g ID) instead of just the data the user sets
//This is most likely a dirty solution and therefore subject to future changes
export interface FullOrder{
    id: string,
    restaurantID: string,
    userID: string,
    comment: string,
    status: string,
    timestamp: string,
    price: string,
    dishes: {
        dish: Dish,
        amount: number
    }[],
}
