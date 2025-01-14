import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-contract-process-view-process-view-collection-plan',
  templateUrl: './collection-plan.component.html',
})
export class ContractProcessViewProcessViewCollectionPlanComponent implements OnInit {
  constructor() {}

  collectionPlanList = []; //收款计划数据
  paymentCollectionList = []; //汇款计划数据
  planList: any = []; //计划下来集合数据
  milestoneList: any = []; //里程碑集合数据
  formatterDollar = (value: number) => {
    if (value) {
      return `¥ ${value}`;
    } else {
      return `¥ `;
    }
  };
  parserDollar = (value: string) => value.replace('¥ ', '');

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
   * 类型触发事件
   */
  planIdChange(data, type) {
    //获取类型名称
    this.getPlanName(data);
    //同步其他三个表格数据
    this.getData();
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
    this.paymentCollectionList = [];
    //循环收款情况
    dataList.forEach(element => {
      //回款表格数据
      let data = {
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
      };
      //回款情况
      let data2 = JSON.parse(JSON.stringify(data));
      data2.planType = '2';
      this.paymentCollectionList.push(data2);
    });
  }

  /**
   * 金额鼠标离开事件
   */
  priceBlur() {
    this.getData();
  }

  /**
   * 获取里程碑名称
   */
  getMileName(element) {
    //判断是否选择里程碑
    if (element.mileId1) {
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if (mile.id === element.mileId1) {
          element.milestone1 = mile.name;
        }
      });
    } else {
      element.milestone1 = '';
    }
    //判断是否选择里程碑
    if (element.mileId2) {
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if (mile.id === element.mileId2) {
          element.milestone2 = mile.name;
        }
      });
    } else {
      element.milestone2 = '';
    }
    //判断是否选择里程碑
    if (element.mileId3) {
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if (mile.id === element.mileId3) {
          element.milestone3 = mile.name;
        }
      });
    } else {
      element.milestone3 = '';
    }
    //判断是否选择里程碑
    if (element.mileId4) {
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if (mile.id === element.mileId4) {
          element.milestone4 = mile.name;
        }
      });
    } else {
      element.milestone4 = '';
    }
    //判断是否选择里程碑
    if (element.mileId5) {
      //循环商务页签中计划表中里程碑下拉数据获取名称
      this.milestoneList.forEach(mile => {
        if (mile.id === element.mileId5) {
          element.milestone5 = mile.name;
        }
      });
    } else {
      element.milestone5 = '';
    }
  }

  /**
   * 里程碑选择事件
   */
  mileIdChange(data) {
    //获取里程碑名称
    this.getMileName(data);
    //同步其他表格数据
    this.getData();
  }

  /**
   * 描述输入改变事件
   */
  descChange() {
    this.getData();
  }

  /**
   * 收款删除按钮
   */
  collectionPlanDelete(sort) {
    this.collectionPlanList = this.collectionPlanList.filter(d => d.sort !== sort);
    //回款删除
    this.paymentCollectionDelete(sort);
  }

  /**
   * 回款删除
   */
  paymentCollectionDelete(sort){
    this.paymentCollectionList = this.paymentCollectionList.filter(d => d.sort !== sort);
  }

  ngOnInit(): void {}

  close() {}
}
