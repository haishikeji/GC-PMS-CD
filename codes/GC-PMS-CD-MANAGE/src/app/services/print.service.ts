import { Injectable } from '@angular/core';
import { element } from 'protractor';
// import { quotationTemplateAndItem, detailData, consumablesTemplateEndilData } from '@shared/utils/export';

@Injectable({
  providedIn: 'root'
})

/**
 * @fileoverview 打印服务
 * 无依赖
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class PrintService {
  baseUrl = "http://119.28.15.214:85/report/";  // 报表根路径
  funcDown = "GetMultipleExcelFile";            // 下载文件函数

  constructor() { }

  /**
   * 导出大分子报价单详情
   *
   * @param {SerialPattern} body 编号模式对象
   * @return {Object} 编号模式列表
   */
  exportProjectQuotationDetail(projectQuotations: any) {
    // 数据格式转换
    let dataobj = {
      projectQuotation: [],
      quotationTemplateList: projectQuotations.quotationTemplateList,
      templateItemList: [],
      quotationDetailList: projectQuotations.quotationDetailList,
      fdProjectQuotationFeeList: projectQuotations.fdProjectQuotationFeeList
    };
    let mainData = projectQuotations;
    delete mainData.quotationTemplateList;
    delete mainData.quotationDetailList;
    delete mainData.fdProjectQuotationFeeList

    if (mainData.submission === "1") {
      mainData.submission = "NMPA"
    } else if (mainData.submission === "2") {
      mainData.submission = "EMA"
    } else if (mainData.submission === "3") {
      mainData.submission = "FDA"
    } else if (mainData.submission === "4") {
      mainData.submission = "PMDA"
    } else {
      mainData.submission = ""
    }

    console.log("合计费用" + mainData.fastingSubtotal + "---" + mainData.postMealSubtotals);
    if (mainData.fastingSubtotal === "0" || mainData.fastingSubtotal === null
      && mainData.postMealSubtotals !== null) {
      mainData.fastingSubtotal = mainData.postMealSubtotals;
    }

    var names;
    //  判断是否有两个费用true否false是
    if (projectQuotations.itemColspanSub === 1) {
      names = true;
    } else {
      names = false;
    }

    dataobj.quotationTemplateList.forEach(element => {
      element.templateItemList.forEach(elements => {
        if (elements.timeline === null || elements.timeline === "null") {
          elements.timeline = " ";
        }
        if (elements.deliverables === null || elements.deliverables === "null") {
          elements.deliverables = " ";
        }
        if (elements.name === null || elements.name === "null") {
          elements.name = " ";
        }
        if (elements.text === null || elements.text === "null") {
          elements.text = " ";
        }
      });
    })

    let projectQuotationItem = {
      projectQuotation: [],
      quotationDetailList: [],
      fdProjectQuotationFeeList: [],
      quotationTemplateList: [],
      templateItemList: [],
      fdProjectQuotationFeeListes: [],
      additionalData: []//外加数据
    };
    if (mainData.taxRate !== null && mainData.taxRate !== "null") {
      mainData.taxRate = mainData.taxRate + "%";
    }
    projectQuotationItem.projectQuotation.push(mainData);
    dataobj.quotationDetailList.forEach(element => {
      if (element.studyType === null || element.studyType === "null") {
        element.studyType = " ";
      }
      if (element.subjectNumber === null || element.subjectNumber === "null") {
        element.subjectNumber = " ";
      }
      if (element.period === null || element.period === "null") {
        element.period = " ";
      }
      if (element.samplesPeriod === null || element.samplesPeriod === "null") {
        element.samplesPeriod = " ";
      }
      if (element.totalSamples === null || element.totalSamples === "null") {
        element.totalSamples = " ";
      }
      if (element.samplesTimeHour === null || element.samplesTimeHour === "null") {
        element.samplesTimeHour = " ";
      }
      if (element.opvPeriod === null || element.opvPeriod === "null") {
        element.opvPeriod = " ";
      }
      if (element.totalSample === null || element.totalSample === "null") {
        element.totalSample = " ";
      }
      if (element.cleaningPeriod === null || element.cleaningPeriod === "null") {
        element.cleaningPeriod = " ";
      }
      if (element.hospitalization === null || element.hospitalization === "null") {
        element.hospitalization = " ";
      }
      if (element.confirmativeAnalysis === null || element.confirmativeAnalysis === "null") {
        element.confirmativeAnalysis = " ";
      }
      if (element.titerAnalysis === null || element.titerAnalysis === "null") {
        element.titerAnalysis = " ";
      }
      projectQuotationItem.quotationDetailList.push(element);
    });


    //处理模板以及模板明细显示的内容和格式调整
    //参数 模板集合带子表明细集合
    // quotationTemplateAndItem(dataobj, projectQuotations);
    //改变费用标题
    //是否只存在一列费用的情况
    // if(names){
    //   //把费用2的标题赋到费用1
    //   if(!projectQuotations.feeCategory1Title){
    //     mainData.feeCategory1Title=projectQuotations.feeCategory2Title;
    //   }
    // }

    // detailData(dataobj);

    let titles = {};
    let additionalObject = {
      totalName: ""//合计名称
    };//外加数对象
    if (mainData.languageType === "0") {
      //  中文
      titles = { 1: "CRO服务项目-chinese", 2: "生物分析-chinese", 3: "CRO相关服务项目-chinese", 4: "临床操作-chinese", 5: "生物分析耗材-chinese", 6: "大分子-chinese", 7: "项目-chinese", 8: "总计-chinese", 9: "备注-chinese", 10: "总计大分子表头-chinese", 11: "生物分析耗材大分子-chinese", 12: "费用单表头-chinese" };
      //合计名称
      additionalObject.totalName = "合计(" + mainData.currencyTypeChName + ")";
    } else if (mainData.languageType === "1") {
      //  中英文
      titles = { 1: "CRO服务项目", 2: "生物分析", 3: "CRO相关服务项目", 4: "临床操作", 5: "生物分析耗材", 6: "大分子", 7: "项目", 8: "总计", 9: "备注", 10: "总计大分子表头", 11: "生物分析耗材大分子" };
      //合计名称
      additionalObject.totalName = "合计(" + mainData.currencyTypeChName + ")";
    } else if (mainData.languageType === "2") {
      //  英文
      titles = { 1: "CRO服务项目-english", 2: "生物分析-english", 3: "CRO相关服务项目-english", 4: "临床操作-english", 5: "生物分析耗材-english", 6: "大分子-english", 7: "项目-english", 8: "总计-english", 9: "备注-english", 10: "总计大分子表头-english", 11: "生物分析耗材大分子-english" };
      //合计名称
      additionalObject.totalName = "Total(" + mainData.currencyTypeEgName + ")";
    }
    let reqDatas = [];//模板json
    let projectData = [];//合计之类的json
    var index = false;
    //大分子报价
    if(projectQuotations.type==="2"){
      index=true;//取决于大分子采样单导出
      dataobj.quotationTemplateList.forEach(element => {
        //如果大分子报价存在临床模板则导出小分子的采样单
        if (element.type === "1"||element.type === "3"||element.type === "4") {
          index = false;
        }
      })
    }
    //小分子采样单
    if (index === false) {
      reqDatas.push({
        Template: titles[7],
        Title: projectQuotations.exportName,
        Wheres: "",
        Datas: projectQuotationItem,
        OpenType: "filedown",
        SubPath: "fangda"
      });
    } else {//大分子采样单
      reqDatas.push({
        Template: titles[7] + "-1",
        Title: projectQuotations.exportName,
        Wheres: "",
        Datas: projectQuotationItem,
        OpenType: "filedown",
        SubPath: "fangda"
      });
    }


    let i = 1;
    let is = 1;
    let els = 1;
    let isMinTem = false;//取决于是否有小分子
    dataobj.quotationTemplateList.forEach(element => {
      //  初始化数据
      projectQuotationItem = {
        projectQuotation: [],
        quotationDetailList: [],
        fdProjectQuotationFeeList: [],
        quotationTemplateList: [],
        templateItemList: [],
        fdProjectQuotationFeeListes: [],
        additionalData: []//合计名称
      };
      projectQuotationItem.projectQuotation.push(mainData);
      //获取外加数据
      projectQuotationItem.additionalData.push(additionalObject);
      projectQuotationItem.projectQuotation.forEach(elementes => {
        if (elementes.currencyTypeChName === null || elementes.currencyTypeChName === "null") {
          elementes.currencyTypeChName = "";
        }
        if (elementes.currencyTypeEgName === null || elementes.currencyTypeEgName === "null") {
          elementes.currencyTypeEgName = "";
        }
      });
      //小分子
      if (element.costColumnNumber === 2) {
        if (element.type === "1") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[1] + "-1",
            Title: titles[1] + "-1" + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "2") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[2] + "-1",
            Title: titles[2] + "-1" + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "3") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[3] + "-1",
            Title: titles[3] + "-1" + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "4") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[4] + "-1",
            Title: titles[4] + "-1" + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "5") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[5] + "-1",
            Title: titles[5] + "-1" + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        }
      } else {
        if (element.type === "1") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[1],
            Title: titles[1] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "2") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[2],
            Title: titles[2] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "3") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[3],
            Title: titles[3] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "4") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[4],
            Title: titles[4] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else if (element.type === "5") {
          projectQuotationItem.quotationTemplateList.push(element);
          element.templateItemList.forEach(elements => {
            projectQuotationItem.templateItemList.push(elements)
          });
          reqDatas.push({
            Template: titles[5],
            Title: titles[5] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        }
      }
      //大分子模板
      if (element.type === "6") {
        projectQuotationItem.quotationTemplateList.push(element);
        element.templateItemList.forEach(elementes => {
          projectQuotationItem.templateItemList.push(elementes);
        })
        //大分子中耗材费模板（因没有项目详情列）
        if (element.isProjectDetails === '1') {
          reqDatas.push({
            Template: titles[11],
            Title: titles[11] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        } else {
          //不是耗材费模板
          reqDatas.push({
            Template: titles[6],
            Title: titles[6] + "(BJ123123)",
            Wheres: "",
            Datas: projectQuotationItem,
            OpenType: "filedown",
            SubPath: "fangda"
          });
        }
      }
      i++;
      // if (is === 1 && element.type !== "6") {
      //   //  存储小分子1~5类型总计
      //   // projectQuotationItem.projectQuotation.push(mainData);
      //   dataobj.fdProjectQuotationFeeList.forEach(elementes => {
      //     if (elementes.feeType === "6") {
      //       return;
      //     }
      //     if (elementes.feeCategory1Subtotal === "0.00" || elementes.feeCategory1Subtotal === null
      //       && elementes.feeCategory2Subtotal !== null) {
      //       elementes.feeCategory1Subtotal = elementes.feeCategory2Subtotal;
      //     }
      //     projectQuotationItem.fdProjectQuotationFeeList.push(elementes);
      //   })
      //   let title = "";
      //   if (element.costColumnNumber === 2) {
      //     title = titles[8] + "-1";
      //   } else {
      //     title = titles[8] + "-min-1";
      //   }
      //   projectData.push({
      //     Template: title,
      //     Title: titles[8] + "-1" + "(BJ123123)",
      //     Wheres: "",
      //     Datas: projectQuotationItem,
      //     OpenType: "filedown",
      //     SubPath: "fangda"
      //   });
      //   is++;
      //   isMinTem = true;
      // }

      // if (els === 1 && element.type === "6") {
      //   console.log("----------------------"+isMinTem)
      //   //  存储大分子6类型总计
      //   // projectQuotationItem.projectQuotation.push(mainData);
      //   dataobj.fdProjectQuotationFeeList.forEach(elementes => {
      //     if (elementes.feeType === "6") {
      //       projectQuotationItem.fdProjectQuotationFeeListes.push(elementes);
      //     }
      //   })
      //   let title = "";
      //   if (element.costColumnNumber === 2) {
      //     title = "总计-大分子两列";
      //     //是否有小分子
      //     if (!isMinTem) {
      //       //没有则调取大分子的表头 有则不调（因小分子费用单有表头）
      //       projectData.push({
      //         Template: titles[10] + "-两列",
      //         Title: titles[10] + "(BJ123123)",
      //         Wheres: "",
      //         Datas: projectQuotationItem,
      //         OpenType: "filedown",
      //         SubPath: "fangda"
      //       });
      //     }
      //   } else {
      //     title = "总计-大分子";
      //     //是否有小分子
      //     if (!isMinTem) {
      //       //没有则调取大分子的表头 有则不调（因小分子费用单有表头）
      //       projectData.push({
      //         Template: titles[10],
      //         Title: titles[10] + "(BJ123123)",
      //         Wheres: "",
      //         Datas: projectQuotationItem,
      //         OpenType: "filedown",
      //         SubPath: "fangda"
      //       });
      //     }
      //   }
      //   //总计表体内容
      //   projectData.push({
      //     Template: title,
      //     Title: titles[8] + "(BJ123123)",
      //     Wheres: "",
      //     Datas: projectQuotationItem,
      //     OpenType: "filedown",
      //     SubPath: "fangda"
      //   });
      //   els++;
      // }
    });

    
    //费用单表头
    let headerTiele = "";
    //存在表头标题则调用两列的费用单表头
    if (projectQuotations.feeCategory1Title) {
      headerTiele = titles[12] + "-二列";
    } else {
      headerTiele = titles[12] + "-一列";
    }
    projectData.push({
      Template: headerTiele,
      Title: headerTiele,
      Wheres: "",
      Datas: projectQuotationItem,
      OpenType: "filedown",
      SubPath: "fangda"
    });

    //表体
    dataobj.fdProjectQuotationFeeList.forEach(elementes => {
      //创建导出JSON
      let feeData = { fdProjectQuotationFeeList: [] };
      let title = "";//导出文件名
      //一列情况
      if (elementes.feeColspan === 1) {
        feeData.fdProjectQuotationFeeList.push(elementes);
        title = "费用单表体-一列";
      }
      //两列情况
      if (elementes.feeColspan === 2) {
        feeData.fdProjectQuotationFeeList.push(elementes);
        title = "费用单表体-二列";
      }
      projectData.push({
        Template: title,
        Title: title,
        Wheres: "",
        Datas: feeData,
        OpenType: "filedown",
        SubPath: "fangda"
      });
    })

    //合计
    // let title = "";
    // if (projectQuotations.itemColspanSub === 0) {
    //   title = "合计-大分子两列";
    // } else {
    //   title = "合计-大分子";
    // }
    projectData.push({
      Template: "合计",
      Title: "合计(BJ123123)",
      Wheres: "",
      Datas: projectQuotationItem,
      OpenType: "filedown",
      SubPath: "fangda"
    });
    //备注
    projectData.push({
      Template: titles[9],
      Title: "备注(BJ123123)",
      Wheres: "",
      Datas: projectQuotationItem,
      OpenType: "filedown",
      SubPath: "fangda"
    });

    //找出耗材模板放到模板的最后面
    // consumablesTemplateEndilData(reqDatas);

    for (let i = 0; i < projectData.length; i++) {
      reqDatas.push(projectData[i]);
    }
    //把生物分析耗材模板放到最后
    console.log("模板")
    console.log(reqDatas);
    // dataobj.projectQuotation.push(mainData);

    // dataobj = this.formatJsonObject(dataobj);

    var url = this.baseUrl + this.funcDown;

    var params = [{
      name: "key",
      value: JSON.stringify(reqDatas)
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
