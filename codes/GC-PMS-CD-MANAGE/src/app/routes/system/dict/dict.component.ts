import { I18NService } from './../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DictService } from 'app/services/dict.service';
import { SystemDictAddComponent } from './add/add.component';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { Dict } from 'app/entity/dict';
import { SystemDictConfigComponent } from './config/config.component';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-system-dict',
  templateUrl: './dict.component.html',
})
export class SystemDictComponent implements OnInit {

  listOfData=[];//字典集合
  page = {
    total: 0,
    current: 0
  };
  dict: Dict;//查询条件
  isSpinning = false;
  @ViewChild("systemDictConfigComponent") systemDictConfigComponent:SystemDictConfigComponent;


  constructor(
    private dictService: DictService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private i18NService : I18NService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.dict = {//初始化数据字典类
      id: "",
      dictName: "",
      dictCode: "",
      description: "",
      pageNo: 0
    }
    this.getListDict(1);
  }



  //查询全部字典集合
  getListDict(pageNo) {
    this.isSpinning = true;
    this.dict.pageNo = pageNo;//当前页码
    this.dict.pkOrg=sessionStorage.getItem("pkOrg");
    this.dictService.getAllDict1(this.dict).then((response) => {
      this.listOfData = response.result.records;
      this.page = response.result;
      this.isSpinning = false;
    })
  }


  //按页码显示数据
  pageIndexChange(event) {
    this.getListDict(event);
  }

  //添加字典
  add() {
    const drawerRef = this.drawerService.create<SystemDictAddComponent, { value: string }, string>({
      nzTitle: this.i18NService.fanyi('add.dictionary'),
      nzWidth: "600px",
      nzContent: SystemDictAddComponent
    });
    //关闭的回调函数
    drawerRef.afterClose.subscribe(() => {
      this.getListDict(this.page.current);
    });
  }

  //修改字典
  update(id) {
    this.dictService.getByIdDict(id).then((respon) => {
      if (respon.success) {//判断是否返回数据
        const drawerRef = this.drawerService.create<SystemDictAddComponent, { dict: Dict }, string>({
          nzTitle: this.i18NService.fanyi('modify.dictionary'),
          nzWidth: "600px",
          nzContent: SystemDictAddComponent,
          nzContentParams: {
            //params
            dict: respon.result
          }
        });

        //关闭的回调函数
        drawerRef.afterClose.subscribe(() => {
          //刷新表中的数据
          this.getListDict(this.page.current);
        });
      }
    });


  }

  //删除字典
  delete(id) {
    this.dictService.deleteDict(id).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("successful.deletion"),"");
        this.getListDict(this.page.current);
      } else {
        this.notification.success(this.i18NService.fanyi("delete.failed"),response.message);
      }
    })

  }

  config(item){
    this.systemDictConfigComponent.config(item);
  }

}
