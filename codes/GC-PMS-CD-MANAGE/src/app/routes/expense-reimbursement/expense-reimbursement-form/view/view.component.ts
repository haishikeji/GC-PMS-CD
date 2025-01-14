import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ReExpenseSlip } from 'app/entity/expense-reimbursement/re-expense-slip';
import { ReExpenseSlipService } from 'app/services/expense-reimbursement/re-expense-slip.service';
import { RoutesUploadDownloadComponent } from 'app/routes/upload-download/upload-download.component';

@Component({
  selector: 'app-expense-reimbursement-expense-reimbursement-form-view',
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
export class ExpenseReimbursementExpenseReimbursementFormViewComponent implements OnInit {
 
  constructor(
    private reExpenseSlipService:ReExpenseSlipService,
    private drawerRef:NzDrawerRef,
    private modalService:NzModalService
  ) { }

  ngOnInit(): void {
    this.isLoadingSave=true;
    this.getListById().then(()=>{
      this.isLoadingSave=false;
    })
  }

  reExpenseSlip: ReExpenseSlip = {}; //对象
  isLoadingSave = false;
  id="";
  itemDataList=[];//子表信息

  /**
   * 根据id查询主子表数据
   */
  getListById(){
    return new Promise((resolve)=>{
      this.reExpenseSlipService.getListById(this.id).then((response)=>{
        this.reExpenseSlip=response.result;//主表
        this.itemDataList=response.result.detailList;//子表明细
        resolve();
      })
    })
  }

  /**
   * 文件上传下来按钮
   */
  uploadDownload(data){
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: RoutesUploadDownloadComponent,
      nzWidth: 600,
      nzComponentParams:{
        fileList:data.files,
        isDownload:false
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        }
      ]
    })
  }


  close() {
    this.drawerRef.close();
  }
}
