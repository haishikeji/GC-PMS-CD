import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ManagerPaymentAndReceiptSlip } from 'app/entity/down-payment-management/manager-payment-and-receipt-slip';
import { ManagerPaymentAndReceiptSlipService } from 'app/services/down-payment-management/manager-payment-and-receipt-slip.service';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { DownPaymentManagementReceiptAddComponent } from './add/add.component';
import { I18NService } from '@core';
import { DownPaymentManagementReceiptUpdateComponent } from './update/update.component';
import { DownPaymentManagementReceiptViewComponent } from './view/view.component';

@Component({
  selector: 'app-down-payment-management-receipt',
  templateUrl: './receipt.component.html',
})
export class DownPaymentManagementReceiptComponent implements OnInit {
  
  constructor(
    private managerPaymentAndReceiptSlipService:ManagerPaymentAndReceiptSlipService,
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private nzNotificationService:NzNotificationService
  ) { }

  ngOnInit() {
    this.getList();
   }

  listOfData = [];
  managerPaymentAndReceiptSlip: ManagerPaymentAndReceiptSlip = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

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
    this.managerPaymentAndReceiptSlipService.getList(this.managerPaymentAndReceiptSlip).then(response => {
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
    const drawerRef = this.nzDrawerService.create<DownPaymentManagementReceiptAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: DownPaymentManagementReceiptAddComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' }
      // nzContentParams: {
      //   //模板id
      //   quotationId: item.id
      // }
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe((isRefresh) => {
      if (isRefresh) {//刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 修改按钮
   */
  update(data){
    const drawerRef = this.nzDrawerService.create<DownPaymentManagementReceiptUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//修改标题
      nzContent: DownPaymentManagementReceiptUpdateComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe((isRefresh) => {
      if (isRefresh) {//刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 详情按钮
   */
  view(data){
    const drawerRef = this.nzDrawerService.create<DownPaymentManagementReceiptViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: DownPaymentManagementReceiptViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });
  }

  /**
   * 删除按钮
   * @param id 删除id
   */
  delete(id){
    let invoiceManagePurchase={id:id}
    this.managerPaymentAndReceiptSlipService.delete(invoiceManagePurchase).then((response)=>{
      if (response.success) {
        //删除成功
        this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
        this.getList();
      } else {
        //删除失败
        this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
      }
    })
  }

}
