import { Pipe, PipeTransform } from '@angular/core';
/*
 * Filter out below min values.
*/
@Pipe({name: 'min'})
export class MinPipe implements PipeTransform {
  transform(value: any, key: string, min?: number): any {
    if (!value) {
      return value;
    }
    if (!min) {
      min = 20;
    }
    if (!key) {
      return value;
    }

    return value.filter(val => {
        return (val[key] > min) ? value : '' ;
    });
  }
}
