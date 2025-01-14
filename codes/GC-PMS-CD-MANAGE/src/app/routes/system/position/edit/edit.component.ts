import { I18NService } from '@core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { Opsition } from 'app/entity/opsition';
import { OpsitionService } from 'app/services/opsition.service';

@Component({
  selector: 'app-system-position-edit',
  templateUrl: './edit.component.html',
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
export class SystemPositionEditComponent implements OnInit {

  @Input() opsition: Opsition;//职位对象
  listCompany:any;//公司集合
  listDepart:any;//部门集合



  constructor(
    private opsitionService: OpsitionService,
    private nzDrawerRef: NzDrawerRef,
    private message: NzMessageService,
    private i18NService:I18NService,
  ) { }

  ngOnInit(): void {
    if (this.opsition == null) {
      this.opsition = {//初始化职位
        id: "",
        code: "",
        name: "",
        pkDepart: "",
        pkOrg: "",
        memo: ""
      }
    }

    //所属公司下拉款的集合
    this.getDepartList();
  }


  getDepartList(){
    this.opsitionService.getByType("1").then((response)=>{
      this.listCompany=response.result//查询公司
    });
    this.opsitionService.getByType("2").then((response)=>{
      this.listDepart=response.result//查询部门
    });
  }

  //保存
  save() {
    if (this.opsition.id == "" || this.opsition.id == null) {
      //添加
      this.opsitionService.addPosition(this.opsition).then((response) => {
        if (response.success == true) {
          this.nzDrawerRef.close();
          this.message.success(this.i18NService.fanyi("insert.success"))
        } else {
          this.message.error(this.i18NService.fanyi("insert.defeated"))
        }
      });
    }else{
      //修改
      this.opsitionService.updateOpsition(this.opsition).then((response)=>{
        if(response.success){
          this.message.success(this.i18NService.fanyi("successful.revision"))
          this.nzDrawerRef.close();
        }else{
          this.message.error(this.i18NService.fanyi("modification.failed"))
        }
      });
    }
  }

  close() {
    this.nzDrawerRef.close();
  }
}
