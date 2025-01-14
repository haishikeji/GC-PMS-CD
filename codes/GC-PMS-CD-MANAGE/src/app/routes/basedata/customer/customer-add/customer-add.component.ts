import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { CustomerService } from 'app/services/basedata/customer.service';

@Component({
  selector: 'app-basedata-customer-customer-add',
  templateUrl: './customer-add.component.html',
})
export class BasedataCustomerCustomerAddComponent implements OnInit {

  contacts = {
    id: "",
    pkCustomerId: "",
    contactPsn: "",
    contectTel: "",
    email: "",
    address: "",
    isDefault: ""
  };//联系人对象
  @Input() isDefault = 0;
  @Input() data = null;//客户联系人
  isDefault2 = 1;
  cryptoJS = require("crypto-js");
  tripledes = require("crypto-js/tripledes");

  constructor(private modal: NzModalRef,

    private customerService: CustomerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    if (this.data == null) {
    } else {
      this.getByIdContacts();
    }
  }

  destroy() {
    this.modal.close(33)
  }

  //根据id查询联系人
  getByIdContacts() {
    this.customerService.getByIdContacts(this.data.id).then((response) => {
      this.contacts = response.result
      //装换
      if (this.contacts.isDefault === "1") {
        this.isDefaults = true;
      } else {
        this.isDefaults = false;
      }
      if (this.contacts.email) {
        this.contacts.email = this.tripledes.decrypt(this.contacts.email, 'email').toString(this.cryptoJS.enc.Utf8);
      }
    })
  }

  //下拉款点击事件
  change(event) {
    //   console.error(event)
    //   if (event) {
    //     this.contacts.isDefault = "1";
    //   } else {
    //     this.contacts.isDefault = "0";
    //   }
  }

  isDefaults = false
}
