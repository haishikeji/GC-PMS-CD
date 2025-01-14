import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';

@Component({
  selector: 'app-project-manage-archives-add-business-affairs',
  templateUrl: './business-affairs.component.html',
})
export class ProjectManageArchivesAddBusinessAffairsComponent implements OnInit {
  constructor(private baseArchivesMilestoneService: BaseArchivesMilestoneService) {}

  ngOnInit(): void {}

  projectManageArchives: ProjectManageArchives = {}; //项目档案实体对象
  collectionPlanList = []; //收款计划数据
  paymentCollectionList = []; //回款情况数据
  paymentPlanList = []; //付款计划
  paymentStatusList = []; //付款情况
  planList: any = []; //计划下来集合数据
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');
  milestoneList: any = []; //里程碑集合数据

  /**
   * 
   收款计划新增
   */
  collectionPlanSort = 0; //收款计划排序
  collectionPlanAdd() {
    this.collectionPlanList = [
      ...this.collectionPlanList,
      {
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        sort: this.collectionPlanSort,
        planType: '1',
      },
    ];
    this.collectionPlanSort++;
    //回款计划新增
    this.paymentCollectionAdd();
    //付款计划新增
    this.paymentPlanAdd();
    //付款计划新增
    this.paymentStatusAdd();
  }

  /**
   * 收款删除按钮
   */
  collectionPlanDelete(sort) {
    this.collectionPlanList = this.collectionPlanList.filter(d => d.sort !== sort);
  }

  /**
   * 回款计划新增
   */
  paymentCollectionSort = 0; //回款情况排序
  paymentCollectionAdd() {
    this.paymentCollectionList = [
      ...this.paymentCollectionList,
      {
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        sort: this.paymentCollectionSort,
        planType: '2',
      },
    ];
    this.paymentCollectionSort++;
  }

  /**
   * 回款删除按钮
   */
  paymentCollectionDelete(sort) {
    this.paymentCollectionList = this.paymentCollectionList.filter(d => d.sort !== sort);
  }

  /**
   * 付款计划新增
   */
  paymentPlanSort = 0;
  paymentPlanAdd() {
    this.paymentPlanList = [
      ...this.paymentPlanList,
      {
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        sort: this.paymentPlanSort,
        planType: '3',
      },
    ];
    this.paymentPlanSort++;
  }

  /**
   * 付款计划删除按钮
   */
  paymentPlanDelete(sort) {
    this.paymentPlanList = this.paymentPlanList.filter(d => d.sort !== sort);
  }

  /**
   * 付款情况
   */
  paymentStatusSort = 0;
  paymentStatusAdd() {
    this.paymentStatusList = [
      ...this.paymentStatusList,
      {
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        sort: this.paymentPlanSort,
        planType: '4',
      },
    ];
    this.paymentPlanSort++;
  }

  /**
   * 付款情况删除按钮
   */
  paymentStatusDelete(sort) {
    this.paymentStatusList = this.paymentStatusList.filter(d => d.sort !== sort);
  }

  /**
   * 类型触发事件
   */
  planIdChange(data, type) {
    //获取类型名称
    this.getPlanName(data);
    //同步其他三个表格数据
    this.getData();
    //如果是回款情况表格中下拉触发
    // if (type === '2') {
    //   //获取收款计划的金额
    //   this.getCollectionPlanPrice(this.collectionPlanList, data);
    //   //回写数据到实施、开发、服务页签的回款信息
    //   this.getRemittanceInformationChange(data);
    // }
    // //如果是付款情况表格中下来触发
    // if (type === '4') {
    //   //获取付款计划中的金额
    //   this.getCollectionPlanPrice(this.paymentPlanList, data);
    // }
  }

  /**
   * 获取类型名称
   * @param data 计划对象
   */
  getPlanName(data) {
    this.planList.forEach(element => {
      if (element.id === data.planId) {
        data.planName = element.name;
      }
    });
  }

  /**
   * 根据回款情况类型获取对应的收款计划金额
   * @param list 表格数据
   * @param data 表格中的对象
   */
  getCollectionPlanPrice(list, data) {
    list.forEach(element => {
      if (data.planId === element.planId) {
        data.price1 = element.price1;
        data.price2 = element.price2;
        data.price3 = element.price3;
        data.price4 = element.price4;
        data.price5 = element.price5;
      }
    });
  }

  

  /**
   * 里程碑选择事件
   * @param data
   */
  mileChange(data) {
    //已汇款金额
    this.getReceived();
    //回写数据到实施、开发、服务页签的回款信息
    this.getRemittanceInformationChange(data);
  }

  /**
   * 获取回款情况中的回款金额累加(已汇款金额)
   */
  getReceived() {
    let received = 0;
    this.paymentCollectionList.forEach(element => {
      if (element.desc1 && !isNaN(Number(element.desc1))) {
        received += Number(element.desc1);
      }
      if (element.desc2 && !isNaN(Number(element.desc2))) {
        received += Number(element.desc2);
      }
      if (element.desc3 && !isNaN(Number(element.desc3))) {
        received += Number(element.desc3);
      }
      if (element.desc4 && !isNaN(Number(element.desc4))) {
        received += Number(element.desc4);
      }
      if (element.desc5 && !isNaN(Number(element.desc5))) {
        received += Number(element.desc5);
      }
    });
    this.projectManageArchives.received = received;
  }

  /**
   * 里程碑选择事件
   */
  mileIdChange(data){
    //获取里程碑名称
    this.getMileName(data)
    //同步其他表格数据
    this.getData();
  }

  /**
   * 获取里程碑名称
   */
  getMileName(element){
    //判断是否选择里程碑
    if(element.mileId1){
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if(mile.id===element.mileId1){
          element.milestone1=mile.name;
        }
      });
    }else{
      element.milestone1="";
    }
    //判断是否选择里程碑
    if(element.mileId2){
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if(mile.id===element.mileId2){
          element.milestone2=mile.name;
        }
      });
    }else{
      element.milestone2="";
    }
    //判断是否选择里程碑
    if(element.mileId3){
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if(mile.id===element.mileId3){
          element.milestone3=mile.name;
        }
      });
    }else{
      element.milestone3="";
    }
    //判断是否选择里程碑
    if(element.mileId4){
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if(mile.id===element.mileId4){
          element.milestone4=mile.name;
        }
      });
    }else{
      element.milestone4="";
    }
    //判断是否选择里程碑
    if(element.mileId5){
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if(mile.id===element.mileId5){
          element.milestone5=mile.name;
        }
      });
    }else{
      element.milestone5="";
    }
  }

  /**
   * 金额鼠标离开事件
   */
  priceBlur(){
    this.getData();
  }

  /**
   * 描述输入改变事件
   */
  descChange(){
    this.getData();
  }

  //根据计划收款信息表格数据复制到其他三个表格数据
  getData() {
    if (this.collectionPlanList) {
      this.getAddData(this.collectionPlanList);
    }
  }

  /**
   * 根据计划收款信息表格数据复制到其他三个表格数据
   * 
   */
  getAddData(dataList) {
    this.paymentCollectionList = [];
    this.paymentCollectionList=[];
    this.paymentPlanList=[];
    this.paymentStatusList=[];
    //循环收款情况
    dataList.forEach(element => {
      //回款表格数据
      let data = 
        {
          planId: element.planId, //计划条线id
          planName: element.planName, //计划条线名称
          price1: element.price1, //金额
          mileId1: element.mileId1, //里程碑id
          milestone1: element.milestone1, //里程碑名称
          price2: element.price2, //金额
          mileId2: element.mileId2, //里程碑id
          milestone2: element.milestone2, //里程碑名称
          price3: element.price3, //金额
          mileId3: element.mileId3, //里程碑id
          milestone3: element.milestone3, //里程碑名称
          price4: element.price4, //金额
          mileId4: element.mileId4, //里程碑id
          milestone4: element.milestone4, //里程碑名称
          price5: element.price5, //金额
          mileId5: element.mileId5, //里程碑id
          milestone5: element.milestone5, //里程碑名称
          sort: element.sort,
          planType: '2',
        }
        //回款情况
        let data2=JSON.parse(JSON.stringify(data));
        data2.planType='2';
        //回写数据到实施、开发、服务页签的回款信息
        this.getRemittanceInformationChange(data2);
        this.paymentCollectionList.push(data2);
        //付款计划
        let data3=JSON.parse(JSON.stringify(data))
        data3.planType='3'
        data3.desc1=element.desc1;
        data3.desc2=element.desc2;
        data3.desc3=element.desc3;
        data3.desc4=element.desc4;
        data3.desc5=element.desc5;
        this.paymentPlanList.push(data3);
        //付款情况
        let data4=JSON.parse(JSON.stringify(data))
        data4.planType='4'
        this.paymentStatusList.push(data4);
    });
    console.log(this.paymentCollectionList)
  }

  /**
   * 回写数据到实施、开发、服务页签的回款信息
   * @param 对象
   */
  @Output() remittanceInformationChange = new EventEmitter<{}>();
  getRemittanceInformationChange(data) {
    this.remittanceInformationChange.emit(data);
  }
}
