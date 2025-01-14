import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SerialPatternService } from 'app/services/serial-pattern.service';
import { SerialPattern } from 'app/entity/serial-pattern';
@Component({
  selector: 'app-system-serial-pattern-add',
  templateUrl: './add.component.html',
  styles: [
    `
      .footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 10px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
      }
    `
  ]
})
/**
 * @fileoverview 编号模式新增，修改页面渲染
 * 依赖编号模式实体类，编号模式网络服务类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SystemSerialPatternAddComponent implements OnInit {

  @Input() serialPattern: SerialPattern;//编号模式对象(@input用于接收点击修改传来的对象)

  constructor(
    private nzDrawerRef: NzDrawerRef,
    private serialPatternService: SerialPatternService,//对接后台接口的service
    private i18NService:I18NService,
  ) { }

  ngOnInit(): void {
    if (this.serialPattern == null) {
      this.serialPattern = {//添加编号模式初始化数据字典类
        id: "",
        tableName: "",
        fieldName: "",
        serialPattern: "",
        description:"",
        createBy:"",
        createTime:"",
        updateBy:"",
        updateTime:""
      }
    }
  }

  //保存
  save() {
    if (this.serialPattern.id === "" || this.serialPattern.id === null) {
      this.serialPattern.pkOrg=sessionStorage.getItem("pkOrg");
      //添加
      this.serialPatternService.add(this.serialPattern).then((response) => {
        if (response.success === true) {
          this.nzDrawerRef.close();
          alert(this.i18NService.fanyi("insert.success"))
        } else {
          alert(this.i18NService.fanyi("insert.defeated"))
        }
      })
    }else{
      //修改
      this.serialPatternService.edit(this.serialPattern).then((response) => {
        if (response.success === true) {
          this.nzDrawerRef.close();
          alert(this.i18NService.fanyi("successful.revision"))
        } else {
          alert(this.i18NService.fanyi("modification.failed"))
        }
      })
    }

  }

  //关闭抽屉
  close() {
    this.nzDrawerRef.close();
  }
}
