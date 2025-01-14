import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { InvoiceManagePurchase } from 'app/entity/invoice-management/invoice-manage-purchase';
import { InvoiceManagePurchaseService } from 'app/services/invoice-management/invoice-manage-purchase.service';

@Component({
  selector: 'app-invoice-management-invoice-manage-purchase-view',
  templateUrl: './view.component.html',
  styles: [
    `
      .base {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 6px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
        z-index: 99;
      }
    `,
  ],
})
export class InvoiceManagementInvoiceManagePurchaseViewComponent implements OnInit {
  

  constructor(
    private invoiceManagePurchaseService:InvoiceManagePurchaseService,
    private drawerRef:NzDrawerRef
  ) { }

  ngOnInit(): void {
    this.isLoadingSave=true;
    this.queryById().then(()=>{
      this.isLoadingSave=false;
    })
  }

  invoiceManagePurchase: InvoiceManagePurchase = {}; //对象
  isLoadingSave = false;
  itemDataList = []; //明细表格数据集合
  id="";

  /**
   * 根据id查询主子表数据
   */
  queryById() {
    return new Promise(resolve => {
      this.invoiceManagePurchaseService.queryById(this.id).then(response => {
        if (response.success) {
          this.invoiceManagePurchase = response.result; //主表
          this.itemDataList = response.result.detailList; //子表数据
          resolve();
        } else {
          resolve();
        }
      });
    });
  }


  close() {
    this.drawerRef.close();
  }
}
