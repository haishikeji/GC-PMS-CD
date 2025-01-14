import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BaseArchivesCost } from 'app/entity/basedata/base-archives-cost';
import { BasedataBaseArchivesCostAddComponent } from './add/add.component';
import { BaseArchivesCostService } from 'app/services/basedata/base-archives-cost.service';
import { I18NService } from '@core';
import { BasedataBaseArchivesCostViewComponent } from './view/view.component';

@Component({
  selector: 'app-basedata-base-archives-cost',
  templateUrl: './base-archives-cost.component.html',
})
export class BasedataBaseArchivesCostComponent implements OnInit {
 

  constructor(
    private modalService:NzModalService,
    private baseArchivesCostService:BaseArchivesCostService,
    private nzNotificationService:NzNotificationService,
    private i18NService:I18NService
  ) { }

  ngOnInit() {
    this.getList();
   }


  listOfData = [];
  baseArchivesCost: BaseArchivesCost={}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.baseArchivesCost.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList(){
    // this.isSpinning=true;
    this.baseArchivesCost.pkOrg=sessionStorage.getItem("pkOrg");//组织
    this.baseArchivesCostService.getList(this.baseArchivesCost).then((response)=>{
      this.listOfData=response.result.records
    })
  }

  /**
   * 查询按钮
   */
  query(){
    this.baseArchivesCost.pageNo = 1;
    this.getList();
  }
  
  /**
   * 新增按钮
   */
  add() {
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: BasedataBaseArchivesCostAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        // id:item.key
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(()=>{
              this.getList();
            })
          }
        }
      ]
    })
  }

  /**
   * 修改按钮
   */
  update(item){
    const modalRef = this.modalService.create({
      nzTitle: "修改",
      nzContent: BasedataBaseArchivesCostAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        id:item.id
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(()=>{
              this.getList();
            })
          }
        }
      ]
    })
  }

  /**
   * 详情按钮
   */
  view(item){
    const modalRef = this.modalService.create({
      nzTitle: "详情",
      nzContent: BasedataBaseArchivesCostViewComponent,
      nzWidth: 600,
      nzComponentParams:{
        id:item.id
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


  /**
   * 删除按钮
   */
  delete(id){
    let baseArchivesCost=new BaseArchivesCost();
    baseArchivesCost.id=id;
    this.baseArchivesCostService.delete(baseArchivesCost).then((response)=>{
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
