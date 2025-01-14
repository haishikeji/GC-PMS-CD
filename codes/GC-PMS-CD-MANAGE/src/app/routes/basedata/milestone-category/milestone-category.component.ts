import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzNotificationService } from 'ng-zorro-antd';
import { DictService } from 'app/services/dict.service';
import { I18NService } from '@core';
import { DictItem } from 'app/entity/dict-item';
import { messageShared } from '@shared/utils/message';
import { BasedataMilestoneCategoryEditComponent } from './edit/edit.component';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-basedata-milestone-category',
  templateUrl: './milestone-category.component.html',
})
export class BasedataMilestoneCategoryComponent implements OnInit {
  constructor(
    private notification: NzNotificationService,
    private dictService: DictService,
    private i18NService: I18NService,
    private location: PlatformLocation,
  ) {}

  ngOnInit() {
    for (const i in this.location) {
      if (i === 'location') {
        this.locationUrl = this.location[i].href;
        break;
      }
    }
    this.getDictItems();
  }
  locationUrl = ''; //页面地址
  visible = false;
  drawerWidth = 900;
  title = '';
  listOfData = [];
  isSpinning = false;
  item = {
    id: '',
    itemText: '',
    itemValue: '',
    dictName: '',
    dictCode: '',
  };

  @ViewChild('categoryEdit') categoryEdit: BasedataMilestoneCategoryEditComponent;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if (width > 900) {
      this.drawerWidth = 900;
    } else {
      this.drawerWidth = width;
    }
  }

  dictItem: DictItem = {}; //处理查询条件
  page: any = {}; //分页参数对象

  getDictItems() {
    //根据不同菜单查询对应数据字典数据
    let dictId="";
    if (this.locationUrl.indexOf('milestone-category')!=-1) {
      //里程碑类型档案
      dictId = '0cbf1113fd44010fb464aa4d2daacf6a';
    }else if(this.locationUrl.indexOf('customer-classification')!=-1){
      //客商分类
      dictId='fb796929d89383ed42d22af60ff9a186'
    }else if(this.locationUrl.indexOf('information-sources')!=-1){
      //信息来源
      dictId='457c4161e45bb4b9243d2de77ce65543'
    }else if(this.locationUrl.indexOf('business-relations')!=-1){
      //商务关系
      dictId='a9fe3a6c0a685e2462094d88f98cda89'
    }else if(this.locationUrl.indexOf('customer-grouping')!=-1){
      //客商分组
      dictId='fb95c1dcba1cfb9f268abc8bff2612ba'
    }else if(this.locationUrl.indexOf('sleep-type')!=-1){
      //休眠类型
      dictId='15668e04b9b2c4e1d5f45df0e72ad3db'
    }else if(this.locationUrl.indexOf('unit-size')!=-1){
      //单位规模
      dictId='e1becd87bc51a88e2578ea8121d901fe'
    }else if(this.locationUrl.indexOf('customer-relationship')!=-1){
      //客户关系
      dictId='c0d7392b35800c89b340a74e1538e9e2'
    }else if(this.locationUrl.indexOf('value-level')!=-1){
      //价值级别
      dictId='2b6a80bf2f4d77c686fdd2d5d5fcef59'
    }else if(this.locationUrl.indexOf('personnel-size')!=-1){
      //人员规模
      dictId='f8d33bfa2ff1812c1efe2ed9d6fdaaca'
    }else if(this.locationUrl.indexOf('registered-capital')!=-1){
      //注册资金
      dictId='913fdf54a4f0194106f7e53a8fe2a4b1'
    }
    if(dictId==''){
      this.notification.warning("未找到档案","");
      return;
    }
    // this.dictItem.dictId=this.item.id;
    this.item.id=dictId
    this.dictItem.dictId=dictId;
    this.isSpinning = true;
    this.dictService.getDictItems(this.dictItem).then(response => {
      this.listOfData = response.result.records;
      this.page = response.result;
      this.isSpinning = false;
    });
  }

  //页码点击事件
  pageIndexChange(event) {
    this.dictItem.pageNo = event; // 当前页码
    this.getDictItems();
  }

  config(item) {
    this.visible = true;
    this.title = this.i18NService.fanyi('configuration.dictionary');
    this.item = item;
    this.getDictItems();
  }

  close() {
    this.visible = false;
  }

  add() {
    this.categoryEdit.add(this.item.id);
  }

  edit(item) {
    this.categoryEdit.edit(item);
  }

  delete(id: string) {
    this.dictService.deleteDictItem(id).then(response => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi('successful.deletion'), '');
        this.getDictItems();
      } else {
        this.notification.error(
          this.i18NService.fanyi('delete.failed'),
          messageShared(this.i18NService, response.message),
        );
      }
    });
  }
}
