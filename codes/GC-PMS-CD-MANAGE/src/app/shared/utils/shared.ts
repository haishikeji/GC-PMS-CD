/**
 * @name: 获取排序
 * @test: test font
 * @param {type} 
 * @return: 
 * @Author: chengchuang
 * @Date: 2019-10-14 20:01:11
 */
export function sort(data?: any) {
  data.forEach((element, index) => {
    element.sort = ++index;
  });
}


/**
 * @description: 隐藏selelct中选中的option
 * @param {type} 
 * @author: 段亚鑫
 */
export function isHideSelectedOption(value?: any) {
  return this.listOfSelectedValue.indexOf(value) === -1;
}