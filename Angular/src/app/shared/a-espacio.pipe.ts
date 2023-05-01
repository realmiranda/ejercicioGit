import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aEspacio'
})
export class AEspacioPipe implements PipeTransform {

  transform(initialValue: string, aSearch: string): string {
    const replaceChar: string = " ";
    return initialValue.replace(aSearch, replaceChar);
  }

}
