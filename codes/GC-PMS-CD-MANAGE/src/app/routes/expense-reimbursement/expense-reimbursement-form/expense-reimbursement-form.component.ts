import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ReExpenseSlip } from 'app/entity/expense-reimbursement/re-expense-slip';
import { ReExpenseSlipService } from 'app/services/expense-reimbursement/re-expense-slip.service';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { ExpenseReimbursementExpenseReimbursementFormAddComponent } from './add/add.component';
import { I18NService } from '@core';
import { ExpenseReimbursementExpenseReimbursementFormUpdateComponent } from './update/update.component';
import { ExpenseReimbursementExpenseReimbursementFormViewComponent } from './view/view.component';

@Component({
  selector: 'app-expense-reimbursement-expense-reimbursement-form',
  templateUrl: './expense-reimbursement-form.component.html',
})
export class ExpenseReimbursementExpenseReimbursementFormComponent implements OnInit {
 
  constructor(
    private reExpenseSlipService:ReExpenseSlipService,
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private nzNotificationService:NzNotificationService
  ) { }

  ngOnInit() { 
    this.getList();
  }

  listOfData = [];
  reExpenseSlip: ReExpenseSlip = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.reExpenseSlip.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList() {
    this.isSpinning = true;
    this.reExpenseSlip.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.reExpenseSlipService.getList(this.reExpenseSlip).then(response => {
      this.listOfData = response.result.records;
      this.isSpinning = false;
    });
  }

  /**
   * 查询按钮
   */
  query() {
    this.reExpenseSlip.pageNo = 1;
    this.getList();
  }

  add() {
    const drawerRef = this.nzDrawerService.create<ExpenseReimbursementExpenseReimbursementFormAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: ExpenseReimbursementExpenseReimbursementFormAddComponent,
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

  update(data){
    const drawerRef = this.nzDrawerService.create<ExpenseReimbursementExpenseReimbursementFormUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//修改标题
      nzContent: ExpenseReimbursementExpenseReimbursementFormUpdateComponent,
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
    const drawerRef = this.nzDrawerService.create<ExpenseReimbursementExpenseReimbursementFormViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: ExpenseReimbursementExpenseReimbursementFormViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });
  }

  delete(id){
    let reExpenseSlip={id:id}
    this.reExpenseSlipService.delete(reExpenseSlip).then((response)=>{
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
