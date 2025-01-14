import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DictService } from 'app/services/dict.service';
import { Dict } from 'app/entity/dict';

@Component({
  selector: 'app-system-dict-add',
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
export class SystemDictAddComponent implements OnInit {

  // @Input() sysDict = null;//字典对象

  @Input() dict: Dict;//数据字典对象(@input用于接收点击修改传来的对象)

  constructor(
    private nzDrawerRef: NzDrawerRef,
    private dictService: DictService,//对接后台接口的service
    private i18NService:I18NService,
  ) { }

  ngOnInit(): void {
    if (this.dict == null) {
      this.dict = {//添加字典初始化数据字典类
        id: "",
        dictName: "",
        dictCode: "",
        description: ""
      }
    }
  }

  //保存
  save() {
    if (this.dict.id == "" || this.dict.id == null) {
      this.dict.pkOrg=sessionStorage.getItem("pkOrg");
      //添加
      this.dictService.addDict(this.dict).then((response) => {
        if (response.success == true) {
          this.nzDrawerRef.close();
          alert(this.i18NService.fanyi("insert.success"))
        } else {
          alert(this.i18NService.fanyi("insert.defeated"))
        }
      })
    }else{
      //修改
      this.dictService.updateDict(this.dict).then((response) => {
        if (response.success == true) {
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
