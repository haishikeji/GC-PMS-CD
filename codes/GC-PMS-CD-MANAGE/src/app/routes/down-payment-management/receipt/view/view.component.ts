import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ManagerPaymentAndReceiptSlip } from 'app/entity/down-payment-management/manager-payment-and-receipt-slip';
import { ManagerPaymentAndReceiptSlipService } from 'app/services/down-payment-management/manager-payment-and-receipt-slip.service';

@Component({
  selector: 'app-down-payment-management-receipt-view',
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
export class DownPaymentManagementReceiptViewComponent implements OnInit {
  

  constructor(
    private managerPaymentAndReceiptSlipService:ManagerPaymentAndReceiptSlipService,
    private drawerRef:NzDrawerRef
  ) { }

  ngOnInit(): void {
    this.isLoadingSave=true;
    this.getById().then(()=>{
      this.isLoadingSave=false;
    })
  }

  managerPaymentAndReceiptSlip: ManagerPaymentAndReceiptSlip = {}; //对象
  isLoadingSave = false;
  id="";
  itemDataList=[];//子表数据

  /**
   * 根据id查询
   */
  getById(){
    return new Promise(resolve => {
      this.managerPaymentAndReceiptSlipService.queryById(this.id).then((response)=>{
        if(response.success){
          this.managerPaymentAndReceiptSlip=response.result;//主表数据
          this.itemDataList=response.result.detailList;//子表数据
        }
        resolve();
      })
    })
  }

  close() {
    this.drawerRef.close();
  }
  
}
