import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ProWorkMilestoneService } from 'app/services/project-work/pro-work-milestone.service';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core';
import { ProWorkMilestone } from 'app/entity/project-work/pro-work-milestone';
import { ProjectWorkProductConfirmationAddComponent } from './add/add.component';
import { ProjectWorkProductConfirmationUpdateComponent } from './update/update.component';
import { ProjectWorkProductConfirmationViewComponent } from './view/view.component';

@Component({
  selector: 'app-project-work-product-confirmation',
  templateUrl: './product-confirmation.component.html',
})
export class ProjectWorkProductConfirmationComponent implements OnInit {
  

  constructor(
    private proWorkMilestoneService:ProWorkMilestoneService,
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private nzNotificationService:NzNotificationService
  ) {}

  ngOnInit() {
    this.getList()
  }

  listOfData = [];
  proWorkMilestone: ProWorkMilestone = {}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.proWorkMilestone.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList() {
    // this.isSpinning=true;
    this.isSpinning=true;
    this.proWorkMilestone.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.proWorkMilestone.type = '4';//产品类型
    this.proWorkMilestoneService.getList(this.proWorkMilestone).then(response => {
      this.listOfData = response.result.records;
      this.isSpinning=false;
    });
  }

  /**
   * 查询按钮
   */
  query() {
    this.proWorkMilestone.pageNo = 1;
    this.getList();
  }

  /**
   * 新增按钮
   */
  add() {
    const drawerRef = this.nzDrawerService.create<ProjectWorkProductConfirmationAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: ProjectWorkProductConfirmationAddComponent,
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

  update(data){
    const drawerRef = this.nzDrawerService.create<ProjectWorkProductConfirmationUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//修改标题
      nzContent: ProjectWorkProductConfirmationUpdateComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //id
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
   * 详情按钮
   */
  view(data){
    const drawerRef = this.nzDrawerService.create<ProjectWorkProductConfirmationViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: ProjectWorkProductConfirmationViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //id
        id: data.id
      }
    });
  }

  /**
   * 删除按钮
   * @param id 删除id
   */
  delete(id){
    let proWorkMilestone=new ProWorkMilestone();
    proWorkMilestone.id=id;
    this.proWorkMilestoneService.delete(proWorkMilestone).then((response)=>{
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
