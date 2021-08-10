import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    let birthdate = new Date(parseInt(value));
    let currentDate = new Date();

    let Difference_In_Time = currentDate.getTime() - birthdate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let age = Difference_In_Days/365;
    age = parseInt(String(Difference_In_Days/365))
    return age;
  }

}
