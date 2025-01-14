import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseArchivesCost } from 'app/entity/basedata/base-archives-cost';
import { BaseArchivesCostService } from 'app/services/basedata/base-archives-cost.service';

@Component({
  selector: 'app-basedata-base-archives-cost-view',
  templateUrl: './view.component.html',
})
export class BasedataBaseArchivesCostViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private baseArchivesCostService:BaseArchivesCostService
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  baseArchivesCost: BaseArchivesCost = {}; //对象
  id = '';

  /**
   * 根据id查询
   */
  getById(){
    this.baseArchivesCostService.getById(this.id).then((response)=>{
      this.baseArchivesCost=response.result;
    })
  }

  close() {
    this.modal.destroy();
  }
}
