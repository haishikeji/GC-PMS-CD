import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';
import { BaseArchivesCollectionLineService } from 'app/services/basedata/base-archives-collection-line.service';

@Component({
  selector: 'app-basedata-base-archives-collection-line-view',
  templateUrl: './view.component.html',
})
export class BasedataBaseArchivesCollectionLineViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private baseArchivesCollectionLineService:BaseArchivesCollectionLineService
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  baseArchivesCollectionLine: BaseArchivesCollectionLine = {}; //对象
  id = '';
  /**
   * 根据id查询
   */
  getById(){
    this.baseArchivesCollectionLineService.getById(this.id).then((response)=>{
      this.baseArchivesCollectionLine=response.result;
    })
  }

  close() {
    this.modal.destroy();
  }
}
