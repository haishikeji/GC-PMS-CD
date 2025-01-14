import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ProWorkLogicService } from 'app/services/project-work/pro-work-logic.service';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core';
import { ProWorkLogic } from 'app/entity/project-work/pro-work-logic';
import { ProjectWorkDevelopmentLogAddComponent } from './add/add.component';
import { ProjectWorkDevelopmentLogUpdateComponent } from './update/update.component';
import { ProjectWorkDevelopmentLogViewComponent } from './view/view.component';

@Component({
  selector: 'app-project-work-development-log',
  templateUrl: './development-log.component.html',
})
export class ProjectWorkDevelopmentLogComponent implements OnInit {
  constructor(
    private proWorkLogicService:ProWorkLogicService,
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private nzNotificationService:NzNotificationService
  ) {}

  ngOnInit() {
    this.getList();
  }
  listOfData = [];
  proWorkLogic: ProWorkLogic = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.proWorkLogic.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList() {
    this.isSpinning=true;
    this.proWorkLogic.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.proWorkLogic.type="1";
    this.proWorkLogicService.getList(this.proWorkLogic).then(response => {
      this.listOfData = response.result.records;
      this.isSpinning=false;
    });
  }

  /**
   * 查询按钮
   */
  query() {
    this.proWorkLogic.pageNo = 1;
    this.getList();
  }
  
  /**
   * 新增按钮
   */
  add() {
    const drawerRef = this.nzDrawerService.create<ProjectWorkDevelopmentLogAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: ProjectWorkDevelopmentLogAddComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' }
      // nzContentParams: {
      //   //模板id
      //   quotationId: item.id
      // }
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe((isRefresh) => {
      if (isRefresh) {//刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 修改
   * @param data 修改对象
   */
  update(data){
    const drawerRef = this.nzDrawerService.create<ProjectWorkDevelopmentLogUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//新增标题
      nzContent: ProjectWorkDevelopmentLogUpdateComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe((isRefresh) => {
      if (isRefresh) {//刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 修改
   * @param data 修改对象
   */
  view(data){
    const drawerRef = this.nzDrawerService.create<ProjectWorkDevelopmentLogViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: ProjectWorkDevelopmentLogViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //模板id
        id: data.id
      }
    });
  }

  /**
   * 删除
   * @param id 
   */
  delete(id){
    let proWorkLogic=new ProWorkLogic();
    proWorkLogic.id=id;
    this.proWorkLogicService.delete(proWorkLogic).then((response)=>{
      if (response.success) {
        //删除成功
        this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
        this.getList();
      } else {
        //删除失败
        this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
      }
    })
  }
}
