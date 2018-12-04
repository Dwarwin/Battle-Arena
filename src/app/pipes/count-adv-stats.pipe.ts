import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countAdvStats'
})
export class CountAdvStatsPipe implements PipeTransform {

  transform(value: number, advancedStat: string): string {
    if (advancedStat === 'damage') {
    return (10 + Math.round((value - 10))).toString();
    }
    if (advancedStat === 'evade') {
      return (Math.round(10 + (value - 10) * 7) + '%');
    }
    if (advancedStat === 'critical') {
      return (Math.round(10 + (value - 10) * 9) + '%');
    }
  }

}
