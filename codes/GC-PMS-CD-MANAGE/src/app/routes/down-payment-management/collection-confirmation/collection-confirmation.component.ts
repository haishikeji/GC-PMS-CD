import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ManagerPaymentAndReceiptSlip } from 'app/entity/down-payment-management/manager-payment-and-receipt-slip';
import { ManagerPaymentAndReceiptSlipService } from 'app/services/down-payment-management/manager-payment-and-receipt-slip.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core';

@Component({
  selector: 'app-down-payment-management-collection-confirmation',
  templateUrl: './collection-confirmation.component.html',
})
export class DownPaymentManagementCollectionConfirmationComponent implements OnInit {
  constructor(
    private managerPaymentAndReceiptSlipService: ManagerPaymentAndReceiptSlipService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit() {}

  listOfData: any = [];
  managerPaymentAndReceiptSlip: ManagerPaymentAndReceiptSlip = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;
  //金额格式化
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');

  //按页码显示数据
  pageIndexChange(event) {
    this.managerPaymentAndReceiptSlip.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList() {
    this.isSpinning = true;
    this.managerPaymentAndReceiptSlip.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.managerPaymentAndReceiptSlip.type = '1'; //收款单
    this.managerPaymentAndReceiptSlipService.getFinanceList(this.managerPaymentAndReceiptSlip).then(response => {
      this.listOfData = response.result.records;
      this.isSpinning = false;
    });
  }

  /**
   * 查询按钮
   */
  query() {
    this.managerPaymentAndReceiptSlip.pageNo = 1;
    this.getList();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  /**
   * 待确认按钮
   */
  toBeConfirmed(data) {
    let where = {
      id: data.id,
      contentId: data.contentId,
      status: '1',
      coPrvice: data.coPrvice,
      proArchivesMilestone: data.proArchivesMilestone,
    };
    this.managerPaymentAndReceiptSlipService.editFinanceList(where).then(response => {
      if (response.success) {
        //确认成功
        this.isSpinning = false;
        this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
        this.getList();
      } else {
        //确认失败
        this.isSpinning = false;
        this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
      }
    });
  }
}
