import { formatNumber } from '@angular/common';

/**
 * @description: 格式化
 * @param {type} 
 * @author: 
 */
export function yuan(value: any): string {
  if (value) {
    return formatNumber(value, 'en_US', '1.2-2');
  }
}

/**
 * @description: 递归查询
 * @param {type} 
 * @author: 
 */
export function recursiveQuery(data: any): string {
  data.forEach(element => {
    if (element.children && element.children.length > 0) {
      element.disabled = true;
      recursiveQuery(element.children);
    }
  });
  return data;
}
