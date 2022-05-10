export interface Restaurant {
    id: string,
    name: string,
    address: string,
    phoneNumber: string,
    dishes: Array<string> | undefined
}
