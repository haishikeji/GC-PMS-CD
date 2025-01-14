import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

/**
 * @fileoverview 打印服务
 * 无依赖
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class PrintContractService {
  // baseUrl = "http://119.28.15.214:85/report/";  // 报表根路径
  baseUrl = "http://report.ihiyun.com/report/";  // 报表根路径
  funcDown = "GetDownFile";                     // 下载文件函数

  constructor(
    private datePipe: DatePipe,
  ) { }

  cryptoJS = require("crypto-js");
  tripledes = require("crypto-js/tripledes");

  /**
   * 导出合同详情
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 编号模式列表
   */
  exportContractDetail(contract: any) {
    //邮箱地址解密 this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
    contract.contactEmail=this.tripledes.decrypt(contract.contactEmail, 'email').toString(this.cryptoJS.enc.Utf8);

    // 数据格式转换
    let dataobj = {
      contract: [],
      customer:[],//客户对象
      contractClauseList: contract.contractClauseList,
    };
    let mainData = contract;
    delete mainData.contractClauseList;
    dataobj.contract.push(mainData);
    //客户对象
    dataobj.customer.push(contract.fdCustomer);

    let i = 1;

    if(dataobj.contractClauseList===undefined || dataobj.contractClauseList==null ||
    dataobj.contractClauseList==='undefined'){
      return;
    }else{
      dataobj.contractClauseList.forEach(element => {
        element.number=i+"";
        i++;
      });
    }

    dataobj = this.formatJsonObject(dataobj);
    var date = "";
    date = this.datePipe.transform(new Date, "yyyy-MM-dd");
    // 请求参数
    var reqData = {
      Template: "合同",
      Title: "合同"+date,
      Wheres: "",
      Datas: dataobj,
      OpenType: "filedown",
      SubPath: "fangda"
    };
    var url = this.baseUrl + this.funcDown;

    var params = [{
      name: "key",
      value: JSON.stringify(reqData)
    }];
    this.formPost(url, params);
  }

  /**
   * 当前页面添加form表单，把参数以post方式提交到url
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 保存结果
   */
  formPost(URL, PARAMTERS) {
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    //如需打开新窗口，form的target属性要设置为'_blank'
    temp_form.target = "_blank";
    temp_form.method = "post";
    temp_form.style.display = "none";
    //添加参数
    for (var item in PARAMTERS) {
      var opt = document.createElement("textarea");
      opt.name = PARAMTERS[item].name;
      opt.value = PARAMTERS[item].value;
      temp_form.appendChild(opt);
      console.log(opt.name);
      console.log(opt.value);
    }
    document.body.appendChild(temp_form);
    //提交数据
    temp_form.submit();
  }
  /**
   * 把json对象第一层null的属性变成[]，后面null的属性变成""
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 保存结果
   */
  formatJsonObject(jsonObject) {
    for (var p in jsonObject) {
      if (jsonObject[p] == null)
        jsonObject[p] = [];
      else {
        var jsonArray = jsonObject[p];
        for (var i = 0, l = jsonArray.length; i < l; i++) {
          for (var key in jsonArray[i]) {
            if (jsonArray[i][key] == null)
              jsonArray[i][key] = "";
          }
        }
      }
    }
    return jsonObject;
  }
}
