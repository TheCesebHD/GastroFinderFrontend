import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Pipe({
  name: 'restaurantSearch'
})
export class RestaurantSearchPipe implements PipeTransform {

  transform(items: Restaurant[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.name.indexOf(filter) !== -1);
  }
}
