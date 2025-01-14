import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DictService } from 'app/services/dict.service';
import { I18NService } from '@core';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-basedata-milestone-category-edit',
  templateUrl: './edit.component.html',
})
export class BasedataMilestoneCategoryEditComponent implements OnInit {
  
  constructor(
    private msgSrv: NzMessageService,
    private notification: NzNotificationService,
    private dictService:DictService,
    private i18NService:I18NService
  ) {}

  ngOnInit(): void {
    this.initDictItem();
  }

  isVisible = false;
  dictitem:any;
  title="";
  @Output() afterSave = new EventEmitter<string>();

  add(id){
    this.isVisible = true;
    this.title=this.i18NService.fanyi("add.dictionary.data.items")
    this.dictitem = {
      dictId:id,
      status:1
    }
  }

  edit(item){
    this.isVisible = true;
    this.title=this.i18NService.fanyi("modify.dictionary.data.items")
    this.dictitem = item;
  }

  handleOk(value: any) {
    if(this.dictitem.id==null ||this.dictitem.id==""){
      this.dictService.addDictItem(this.dictitem).then((response) => {
        if(response.success){
          this.notification.success(this.i18NService.fanyi("insert.success"),"");
          this.afterSave.emit(this.dictitem.dictId);
          this.initDictItem();
          this.close();
        }else{
          this.notification.error(this.i18NService.fanyi("insert.defeated"),messageShared(this.i18NService,response.message));
        }
      })
    }else{
      this.dictService.editDictItem(this.dictitem).then((response) => {
        if(response.success){
          this.notification.success(this.i18NService.fanyi("successful.revision"),"");
          this.afterSave.emit(this.dictitem.dictId);
          this.initDictItem();
          this.close();
        }else{
          this.notification.error(this.i18NService.fanyi("modification.failed"),messageShared(this.i18NService,response.message));
        }
      })
    }
  }

  close() {
    this.isVisible = false;
  }

  handleCancel(){
    this.close();
  }

  initDictItem(){
    this.dictitem = {
      id:"",
      itemText:"",
      itemValue:"",
      sortOrder:"",
      status:"",
      dictId:"",
      description:""
    }
  }
}
