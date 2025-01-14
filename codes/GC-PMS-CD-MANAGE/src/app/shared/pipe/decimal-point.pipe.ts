import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint'
})
export class DecimalPointPipe implements PipeTransform {

  /**
   * @description: 控制小数点后位数
   * @param {type} 
   * @author: 段亚鑫
   */
  transform(value: any, digit?: any): any {
    if (Number(value)) {
      value = Number(value);
      digit ? (digit = digit) : (digit = 2);
      value = value.toFixed(digit);
      return value;
    } else if (!value) {
      return value;
    }
  }

}
