import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from 'src/app/interfaces/dish';

@Pipe({
  name: 'dishFilter'
})
export class DishFilterPipe implements PipeTransform {

  transform(items: Dish[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.name.indexOf(filter) !== -1);
  }

}
