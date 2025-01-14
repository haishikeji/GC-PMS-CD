import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * 报表打印
 */
export class ReportFormPrintService {
  constructor() {}
  // TODO 导出接口地址
  baseUrl = 'http://192.168.2.150:10000/report/'; // 报表根路径
  funcDown = 'GetMultipleExcelFile'; // 下载文件函数

  /**
   * 项目成本核算导出
   * @param listData 导出数据
   */
  getProjectStatistics(listData) {
    var url = this.baseUrl + this.funcDown;
    let reqDataList = []; //模板json
    let projectStatisticsJson = {
      mainList: [], //成本核算主数据
    }; //导出数据json
    projectStatisticsJson.mainList = JSON.parse(JSON.stringify(listData));
    //把json对象第一层null的属性变成[]，后面null的属性变成""
    this.formatJsonObject(projectStatisticsJson);
    //添加模板json
    reqDataList.push({
      Template: '项目成本核算',
      Title: '项目成本核算',
      Wheres: '',
      Datas: projectStatisticsJson,
      OpenType: 'filedown',
      SubPath: 'cd-project-management',
    });
    console.log(reqDataList);
    var params = [
      {
        name: 'key',
        value: JSON.stringify(reqDataList),
      },
    ];
    this.formPost(url, params);
  }

  /**
   * 当前页面添加form表单，把参数以post方式提交到url
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 保存结果
   */
  formPost(URL, PARAMTERS) {
    var temp_form = document.createElement('form');
    temp_form.action = URL;
    //如需打开新窗口，form的target属性要设置为'_blank'
    temp_form.target = '_blank';
    temp_form.method = 'post';
    temp_form.style.display = 'none';
    //添加参数
    for (var item in PARAMTERS) {
      var opt = document.createElement('textarea');
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
      if (jsonObject[p] == null) jsonObject[p] = [];
      else {
        var jsonArray = jsonObject[p];
        for (var i = 0, l = jsonArray.length; i < l; i++) {
          for (var key in jsonArray[i]) {
            if (jsonArray[i][key] == null) jsonArray[i][key] = '';
          }
        }
      }
    }
    return jsonObject;
  }
}
