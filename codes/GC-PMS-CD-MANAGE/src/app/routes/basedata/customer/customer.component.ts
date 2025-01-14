import { I18NService } from '@core';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzDrawerService, NzDropdownService, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { BasedataCustomerEditComponent } from './edit/edit.component';
import { CustomerService } from 'app/services/basedata/customer.service';
import { Customer } from 'app/entity/basedata/customer';
import { BasedataCustomerDetailsComponent } from './details/details.component';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-basedata-customer',
  templateUrl: './customer.component.html',
})
export class BasedataCustomerComponent implements OnInit, OnDestroy {
  listOfData = [];
  customer: Customer; //客户对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  constructor(
    private nzDropdownService: NzDropdownService,
    private drawerService: NzDrawerService,
    private customerService: CustomerService,
    private message: NzMessageService,
    private el: ElementRef,
    private i18Nservice: I18NService,
    private eventManager: EventManager,
    private notification: NzNotificationService,
  ) {}

  ngOnInit() {
    this.customer = {
      code: '',
      name: '',
    };
    this.getList();
  }

  ngOnDestroy() {
    console.error('组件销毁');
    this.eventManager.getZone();
  }

  //查询全部
  getList() {
    this.isSpinning = true;
    this.customer.pkOrg=sessionStorage.getItem("pkOrg");
    this.customerService.getCustomer1(this.customer).then(response => {
      this.listOfData = response.result.records;
      this.page = response.result;
      this.isSpinning = false;
    });
  }

  //查询按钮
  query() {
    this.customer.pageNo = 1;
    this.getList();
  }

  //按页码显示数据
  pageIndexChange(event) {
    this.customer.pageNo = event; //当前页码
    this.getList();
  }

  //新增档案和修改档案
  edit(id) {
    //抽屉的标题
    var title = '';
    if (id == null || id == '') {
      title = document.getElementById('titleAdd').textContent;
    } else {
      title = document.getElementById('titleUpdate').textContent;
    }

    //抽屉
    const drawerAddDepar = this.drawerService.create<BasedataCustomerEditComponent, { id: string }, string>({
      nzTitle: title,
      nzPlacement: 'right',
      nzWidth: '100%',
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContent: BasedataCustomerEditComponent,
      nzContentParams: {
        id: id, //客户id
      },
    });
    //回调 添加完关闭抽屉
    drawerAddDepar.afterClose.subscribe(clo => {
      if (clo) {
        //判断是否刷新树列表数据
        this.getList();
      }
    });
  }

  //删除档案
  delete(id) {
    //根据客户id查询报价是否有对应的客户
    // this.customerService.getProjectIsCustomer(id).then(responseIsCustomer => {
    //   //是否找到
    //   if (responseIsCustomer.result) {
    //     //报价中已使用客户，不能被删除
    //     this.notification.warning(this.i18Nservice.fanyi('Customer.used.in.quotation.cannot.be.deleted'), '');
    //   } else {
        this.customerService.deleteCustomer(id).then(response => {
          if (response.success) {
            this.message.success(this.i18Nservice.fanyi('successful.deletion'));
            this.getList();
          } else {
            this.message.success(this.i18Nservice.fanyi('delete.failed'));
          }
        });
    //   }
    // });
  }

  /**
   * @description: 详情
   * @param {type}
   * @author: 段亚鑫
   */
  openDetails(id) {
    this.drawerService.create({
      nzTitle: this.i18Nservice.fanyi('check.customer.file'),
      nzWidth: '100%',
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContent: BasedataCustomerDetailsComponent,
      nzContentParams: {
        id: id,
      },
    });
  }
}
