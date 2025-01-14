import { I18NService } from '@core';

/**
 * 后台返回的异常字符串翻译处理
 * @param i18NService 翻译对象
 * @param message 异常字符串
 */
export function messageShared(i18NService: I18NService, message: string): string {
  let resultMessage = "";//翻译后的异常字符串
  try {
    //异常字符串不为空则
    if (message) {
      //整段字符异常
      if (message.indexOf("<br/>") === -1) {
        resultMessage = i18NService.fanyi(message);
      } else {
        //新增或者修改时字段为空验证
        let messages = message.split("<br/>");
        messages.forEach((messageObject, index) => {
          //除最后一个异常则都翻译
          if (index < messages.length - 1) {
            resultMessage += i18NService.fanyi(messageObject) + "<br/>";
          }
        });
      }
    }
    console.log("message:" + resultMessage);
  } catch (error) {
    console.log("message2:" + resultMessage);
    resultMessage=message;
  }
  return resultMessage;
}