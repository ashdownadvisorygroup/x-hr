import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// export const DATE_FORMAT_FOR_SERVER = 'yyyy-MM-ddThh:mm:ss';
export const DATE_FORMAT_FOR_SERVER = 'yyyy-MM-dd';

@Pipe({
  name: 'serverFormatDate'
})
export class ServerFormatDatePipe extends DatePipe implements PipeTransform {

  transform(date: unknown, format?: string): string {
    console.warn('yess');
    return super.transform(date, format || DATE_FORMAT_FOR_SERVER);
  }

}
