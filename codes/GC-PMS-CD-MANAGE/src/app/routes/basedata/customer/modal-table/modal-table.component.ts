import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { Customer } from 'app/entity/basedata/customer';
import { CustomerService } from 'app/services/basedata/customer.service';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-basedata-customer-modal-table',
  templateUrl: './modal-table.component.html',
})
export class BasedataCustomerModalTableComponent implements OnInit {
  customer: Customer = {};

  //页码
  page = {
    total: 0,
    current: 0,
    // pageNo: '',
  };

  constructor(
    private customerService: CustomerService,
    private modal: NzModalRef,
    private notification: NzNotificationService,
  ) {}

  ngOnInit() {
    this.getTableList();
  }

  selectData = []; //弹框所有列表数据
  isSpinning = false;

  //查询按钮
  query() {
    this.customer.pageNo = 1;
    this.getTableList();
  }
  //查询列表数据
  getTableList() {
    this.isSpinning = true;
    this.customer.pkOrg = sessionStorage.getItem('pkOrg');
    this.customerService.getCustomer1(this.customer).then(res => {
      // console.log('!!!!!--->', res);
      this.selectData = res.result.records;
      console.log('弹框列表集合--->', this.selectData);
      this.page = res.result; //页码信息
      this.isSpinning = false;
    });
  }

  listOfDisplayData: any[] = []; //所有列表集合（包含勾选框）
  mapOfCheckedId: { [key: string]: boolean } = {}; //已勾选 and 层勾选的项
  selectComName: ''; //勾选的公司名称
  selectObj: any = []; //被勾选的集合
  //勾选 的回调
  refreshStatus(): void {
    // console.log('所有列表集合（包含勾选）', this.listOfDisplayData);
  }

  //勾选弹框 确定
  handleOk(): void {
    console.log('111111');
    this.selectObj = []; //清空其他的勾选记录
    this.listOfDisplayData.forEach(element => {
      //判断 出 已勾选 true
      if (this.mapOfCheckedId[element.id]) {
        var obj = {
          id: element.id,
          name: element.name,
        };
        this.selectObj.push(obj);
        console.log('勾选的上级单位', obj);
        // console.log(this.selectObj);
      }
    });
    //判断勾选个数
    if (this.selectObj.length == 1) {
      // console.log('勾选的名称', this.selectObj[0].name);
      console.log( this.selectObj[0].name);
      console.log('该对象selectObj',this.selectObj);
      this.modal.destroy();
    } else {
      this.notification.warning('错误提示', '上级单位只可选择一个！'); //通知提醒框
    }
  }

  handleCancel(): void {
    this.modal.destroy();
    console.log('销毁该弹框');
  }
  //按页码显示数据
  pageIndexChange(event) {
    this.customer.pageNo = event; //当前页码
    this.getTableList();
  }
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
}
