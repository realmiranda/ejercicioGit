import { Pipe, PipeTransform } from '@angular/core';
import {Auto} from "../interfaces/car";

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(initialValue: Auto[], args: any): Auto[] {
    const { itemsPerPage, currentPage } = args;
    return initialValue.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

}






