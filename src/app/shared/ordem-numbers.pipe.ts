import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'sort-by';

@Pipe({
  name: 'ordemNumbers'
})
export class OrdemNumbersPipe implements PipeTransform {

  transform(list: any, params?: string): any {
    if (params.length) {
      return list.sort(sortBy(params));
    }
    return list;
  }

}
