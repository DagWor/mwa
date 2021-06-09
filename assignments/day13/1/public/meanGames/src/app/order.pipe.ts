import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: number): string {

    const firstDigit = value % 10;
    let prefix = "th";
    switch (firstDigit) {
      case 1:
        prefix = 'st'
        break;
      case 2:
        prefix = 'nd'
        break;
      case 3:
        prefix = 'rd'
        break;
      default:
        break;
    }

    return value + prefix;
  }

}
