import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduce'
})
export class TraducePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
