import { AmountDish } from "./selected-dish";

export interface Order {
    restaurantID: string,
    dishes: {
        id: string,
        amount: number
    }[],
    comment: string
}
