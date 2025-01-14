import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProWorkLogicService } from 'app/services/project-work/pro-work-logic.service';
import { ProWorkLogic } from 'app/entity/project-work/pro-work-logic';

@Component({
  selector: 'app-project-work-service-log-view',
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
export class ProjectWorkServiceLogViewComponent implements OnInit {
  

  constructor(
    private proWorkLogicService:ProWorkLogicService,
    private drawerRef:NzDrawerRef
  ) {}

  ngOnInit(): void {
    this.isLoadingSave=true;
    this.getById().then(()=>{
      this.isLoadingSave=false;
    });
  }

  isLoadingSave=false;
  proWorkLogic: ProWorkLogic = {}; //对象
  itemList = []; //明细集合
  id="";

  /**
   * 根据id查询
   */
  getById(){
    return new Promise((resolve)=>{
      this.proWorkLogicService.getListById(this.id).then((response)=>{
        if(response.result){
          this.proWorkLogic=response.result;//主表对象
          this.itemList=response.result.detailList;//明细数组
        }
        resolve();
      })
    })
  }

  close() {
    this.drawerRef.close();
  }
}
