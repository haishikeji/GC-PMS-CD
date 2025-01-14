import { I18NService } from '@core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { OpsitionService } from 'app/services/opsition.service';
import { Opsition } from 'app/entity/opsition';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { SystemPositionEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-system-position',
  templateUrl: './position.component.html',
})
export class SystemPositionComponent implements OnInit {

  listOfData: [];
  opsition: Opsition;
  page = {
    total: 0,
    current: 0
  };

  constructor(private opsitionService: OpsitionService
    ,
    private drawerService: NzDrawerService,
    private message: NzMessageService,
    private i18NService:I18NService,
  ) { }

  ngOnInit() {
    this.opsition = {//初始化数据字典类
      pageNo: 0
    }
    this.getAllOpsition(1);
  }

  getAllOpsition(pageNo) {
    this.opsition.pageNo = pageNo;//当前页码
    this.opsitionService.getAllOpsition(this.opsition).then((response) => {
      this.listOfData = response.result.records
      this.page = response.result
    })
  }

  //添加职业
  add() {
    const drawerRef = this.drawerService.create<SystemPositionEditComponent, { value: string }, string>({
      nzTitle: this.i18NService.fanyi('add.dictionary'),
      nzWidth: "600px",
      nzContent: SystemPositionEditComponent
    });
    //关闭的回调函数
    drawerRef.afterClose.subscribe(() => {
      this.getAllOpsition(this.page.current);
    });
  }

  //添加职业
  update(id: string) {
    this.opsitionService.getById(id).then((response) => {
      if (response.success) {
        const drawerRef = this.drawerService.create<SystemPositionEditComponent, { opsition: Opsition }, string>({
          nzTitle: this.i18NService.fanyi('modify.occupation'),
          nzWidth: "600px",
          nzContent: SystemPositionEditComponent,
          nzContentParams: {
            //params
            opsition: response.result
          }
        });

        //关闭的回调函数
        drawerRef.afterClose.subscribe(() => {
          this.getAllOpsition(this.page.current);
        });
      }else{
        this.message.warning(this.i18NService.fanyi("no.data.found.to.be.modified"))
      }
    });
  }

  delete(id:string){
    this.opsitionService.deleteOpsition(id).then((response)=>{
      if(response.success){
        this.message.success(this.i18NService.fanyi("successful.deletion"))
        this.getAllOpsition(this.page.current);
      }else{
        this.message.error(this.i18NService.fanyi("delete.failed"))
      }
    });
  }
}
