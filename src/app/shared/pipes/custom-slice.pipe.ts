import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice'
})
export class CustomSlicePipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (value.length <args[1])
      return value;
    else
      return value.slice(args[0], args[1])+"...";
  }

}
