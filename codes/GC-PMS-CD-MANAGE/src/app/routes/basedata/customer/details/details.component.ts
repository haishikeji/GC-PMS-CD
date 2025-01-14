import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Customer } from 'app/entity/basedata/customer';
import { CustomerService } from 'app/services/basedata/customer.service';

@Component({
  selector: 'app-basedata-customer-details',
  templateUrl: './details.component.html',
  styles: [
    `
      .footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 10px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
      }
    `,
  ],
})
export class BasedataCustomerDetailsComponent implements OnInit {
  constructor(private http: _HttpClient, private drawerRef: NzDrawerRef, private customerService: CustomerService) {}

  ngOnInit() {
    this.getById().then(() => {
      this.getListContacts().then(() => {
        this.isLoading = false;
      });
    });
  }

  @Input() id; // id
  customer: Customer = {}; // 实体
  listOfData: any = []; // 明细表
  enable = false; // 是否停用
  codeDisabled = false;
  isLoading = true;
  cryptoJS = require('crypto-js');
  tripledes = require('crypto-js/tripledes');

  /**
   * @description: 主表
   * @param {type}
   * @author: 段亚鑫
   */

  //根据点击的 id看详情
  getById() {
    return new Promise(resolve => {
      this.customerService.getById(this.id).then(response => {
        console.log('这是所有的客户属性吗',response);
        this.customer = response.result;
        if (response.result.enable === '0') {
          this.enable = false;
        } else {
          this.enable = true;
        }
        if (this.customer.email) {
          this.customer.email = this.tripledes.decrypt(this.customer.email, 'email').toString(this.cryptoJS.enc.Utf8);
        }
        resolve();
      });
    });
  }

  /**
   * @description: 查询联系人
   * @param {type}
   * @author: 段亚鑫
   */

  //联系人
  getListContacts() {
    return new Promise(resolve => {
      const contacts = {
        pkCustomerId: this.id,
        pageSize: 500,
      };
      this.customerService.getListContacts(contacts).then(response => {
        this.listOfData = response.result.records;
        this.listOfData.forEach(element => {
          if (element.email) {
            element.email = this.tripledes.decrypt(element.email, 'email').toString(this.cryptoJS.enc.Utf8);
          }
        });
        resolve();
      });
    });
  }

  /**
   * @description: 关闭
   * @param {type}
   * @author: 段亚鑫
   */
  close() {
    this.drawerRef.close();
  }
}
