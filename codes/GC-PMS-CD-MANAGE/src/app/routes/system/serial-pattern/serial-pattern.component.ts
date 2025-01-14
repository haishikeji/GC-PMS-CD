import { I18NService } from './../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { SerialPatternService } from 'app/services/serial-pattern.service';
import {SerialPattern } from 'app/entity/serial-pattern';
import { SystemSerialPatternAddComponent } from './add/add.component';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-system-serial-pattern',
  templateUrl: './serial-pattern.component.html',
})

/**
 * @fileoverview 编号模式列表页面渲染
 * 依赖编号模式实体类，编号模式网络服务类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SystemSerialPatternComponent implements OnInit {

  listOfData=[];//编号模式列表
  page = {
    total: 0,
    current: 0
  };
  serialPattern: SerialPattern;//查询条件
  isSpinning = false;

  constructor(
    private serialPatternService: SerialPatternService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private i18NService : I18NService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.serialPattern = {//初始化查询条件
      id: "",
      tableName: "",
      fieldName: "",
      serialPattern: "",
      pageNo: 0
    }
    this.list(1);
  }



  // 获取分页编号模式列表
  list(pageNo) {
    this.isSpinning = true;
    this.serialPattern.pageNo = pageNo;//当前页码
    this.serialPattern.pkOrg=sessionStorage.getItem("pkOrg");
    this.serialPatternService.list1(this.serialPattern).then((response) => {
      this.listOfData = response.result.records;
      this.page = response.result;
      this.isSpinning = false;
    })
  }


  // 翻页事件
  pageIndexChange(event) {
    this.list(event);
  }

  //添加
  add() {
    const drawerRef = this.drawerService.create<SystemSerialPatternAddComponent, { value: string }, string>({
      nzTitle:this.i18NService.fanyi('add.numbering.mode'),
      nzWidth: "600px",
      nzContent: SystemSerialPatternAddComponent
    });
    //关闭的回调函数
    drawerRef.afterClose.subscribe(() => {
      this.list(this.page.current);
    });
  }

  //修改
  edit(id) {
    this.serialPatternService.queryById(id).then((respon) => {
      if (respon.success) {//判断是否返回数据
        const drawerRef = this.drawerService.create<SystemSerialPatternAddComponent, { serialPattern: SerialPattern }, string>({
          nzTitle: this.i18NService.fanyi('modify.numbering.mode'),
          nzWidth: "600px",
          nzContent: SystemSerialPatternAddComponent,
          nzContentParams: {
            //params
            serialPattern: respon.result
          }
        });

        //关闭的回调函数
        drawerRef.afterClose.subscribe(() => {
          //刷新表中的数据
          this.list(this.page.current);
        });
      }
    });


  }

  //删除
  delete(id) {
    this.serialPatternService.delete(id).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("successful.deletion"),"");
        this.list(this.page.current);
      } else {
        this.notification.success(this.i18NService.fanyi("delete.failed"),response.message);
      }
    })

  }
  cancelDel(){

  }

}
