import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { InvoiceManagePurchase } from 'app/entity/invoice-management/invoice-manage-purchase';
import { InvoiceManagePurchaseService } from 'app/services/invoice-management/invoice-manage-purchase.service';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { InvoiceManagementInvoiceManagePurchaseAddComponent } from './add/add.component';
import { I18NService } from '@core';
import { InvoiceManagementInvoiceManagePurchaseUpdateComponent } from './update/update.component';
import { InvoiceManagementInvoiceManagePurchaseViewComponent } from './view/view.component';

@Component({
  selector: 'app-invoice-management-invoice-manage-purchase',
  templateUrl: './invoice-manage-purchase.component.html',
})
export class InvoiceManagementInvoiceManagePurchaseComponent implements OnInit {
  constructor(
    private invoiceManagePurchaseService: InvoiceManagePurchaseService,
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private nzNotificationService:NzNotificationService
    ) {}

  ngOnInit() {
    this.getList()
  }

  listOfData = [];
  invoiceManagePurchase: InvoiceManagePurchase = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.invoiceManagePurchase.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList() {
    this.isSpinning = true;
    this.invoiceManagePurchase.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.invoiceManagePurchase.type = '1'; //采购发票
    this.invoiceManagePurchaseService.getList(this.invoiceManagePurchase).then(response => {
      this.listOfData = response.result.records;
      this.isSpinning = false;
    });
  }

  /**
   * 新增按钮
   */
  add() {
    const drawerRef = this.nzDrawerService.create<InvoiceManagementInvoiceManagePurchaseAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: InvoiceManagementInvoiceManagePurchaseAddComponent,
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
   * @param data 修改对象
   */
  update(data) {
    const drawerRef = this.nzDrawerService.create<InvoiceManagementInvoiceManagePurchaseUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//新增标题
      nzContent: InvoiceManagementInvoiceManagePurchaseUpdateComponent,
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
   * @param data 详情对象
   */
  view(data) {
    const drawerRef = this.nzDrawerService.create<InvoiceManagementInvoiceManagePurchaseViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: InvoiceManagementInvoiceManagePurchaseViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });
  }

  delete(id) {
    let invoiceManagePurchase=new InvoiceManagePurchase();
    invoiceManagePurchase.id=id;
    this.invoiceManagePurchaseService.delete(invoiceManagePurchase).then((response)=>{
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

  /**
   * 查询按钮
   */
  query() {
    this.invoiceManagePurchase.pageNo = 1;
    this.getList();
  }
}
