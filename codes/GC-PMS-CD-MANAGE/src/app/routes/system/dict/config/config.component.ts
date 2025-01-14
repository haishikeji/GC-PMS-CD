import { I18NService } from './../../../../core/i18n/i18n.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { DictService } from 'app/services/dict.service';
import { SystemDictConfigEditComponent } from './edit/edit.component';
import { Dict } from 'app/entity/dict';
import { DictItem } from 'app/entity/dict-item';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-dict-config',
  templateUrl: './config.component.html',
})
export class SystemDictConfigComponent implements OnInit {

  constructor(
    private notification: NzNotificationService,
    private dictService: DictService,
    private i18NService: I18NService,
    ) { }

  ngOnInit() { }

  visible = false;
  drawerWidth = 900;
  title="";
  listOfData=[];
  isSpinning=false;
  item={
    id:"",
    itemText:"",
    itemValue:"",
    dictName:"",
    dictCode:""
  };

  @ViewChild("systemDictConfigEditComponent") systemDictConfigEditComponent:SystemDictConfigEditComponent;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if(width>900){
      this.drawerWidth = 900;
    }else{
      this.drawerWidth = width;
    }
  }

  dictItem:DictItem={}//处理查询条件
  page:any={};//分页参数对象

  getDictItems(){
    this.dictItem.dictId=this.item.id;
    this.isSpinning = true;
    this.dictService.getDictItems(this.dictItem).then((response)=>{
      this.listOfData = response.result.records;
      this.page=response.result
      this.isSpinning = false;
    })
  }

  //页码点击事件
  pageIndexChange(event) {
    this.dictItem.pageNo = event; // 当前页码
    this.getDictItems();
  }

  config(item) {
    this.visible = true;
    this.title = this.i18NService.fanyi("configuration.dictionary")
    this.item = item;
    this.getDictItems();
  }

  close(){
    this.visible = false;
  }

  add(){
    this.systemDictConfigEditComponent.add(this.item.id);
  }

  edit(item){
    this.systemDictConfigEditComponent.edit(item);
  }

  delete(id:string){
    this.dictService.deleteDictItem(id).then((response) => {
      if(response.success){
        this.notification.success(this.i18NService.fanyi("successful.deletion"),"");
        this.getDictItems();
      }else{
        this.notification.error(this.i18NService.fanyi("delete.failed"),messageShared(this.i18NService,response.message));
      }
    })
  }



}
