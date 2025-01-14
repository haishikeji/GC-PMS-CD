import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { I18NService } from '@core';
import { ProjectManageArchivesAddComponent } from '../add/add.component';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { ProjectManageArchivesUpdateComponent } from '../update/update.component';
import { ProjectManageArchivesViewComponent } from '../view/view.component';

@Component({
  selector: 'app-project-manage-archives-list',
  templateUrl: './list.component.html',
})
export class ProjectManageArchivesListComponent implements OnInit {
  

  constructor(
    private nzDrawerService:NzDrawerService,
    private i18NService:I18NService,
    private projectManageArchivesService:ProjectManageArchivesService,
    private nzNotificationService:NzNotificationService
  ) { }

  ngOnInit() { 
    this.getList();
  }

  listOfData = [];
  projectManageArchives: ProjectManageArchives={}; //对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  //按页码显示数据
  pageIndexChange(event) {
    this.projectManageArchives.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询数据表
   */
  getList(){
    this.isSpinning=true;
    this.projectManageArchives.pkOrg=sessionStorage.getItem("pkOrg");//组织
    this.projectManageArchivesService.getList(this.projectManageArchives).then((response)=>{
      this.listOfData=response.result.records
      this.isSpinning=false;
    })
  }

  /**
   * 查询按钮
   */
  query(){
    this.projectManageArchives.pageNo = 1;
    this.getList();
  }

  /**
   * 新增
   */
  add() {
    const drawerRef = this.nzDrawerService.create<ProjectManageArchivesAddComponent, { quotationId: string }, string>({
      nzTitle: this.i18NService.fanyi("button.add"),//新增标题
      nzContent: ProjectManageArchivesAddComponent,
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
   */
  update(data){
    const drawerRef = this.nzDrawerService.create<ProjectManageArchivesUpdateComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.update"),//修改标题
      nzContent: ProjectManageArchivesUpdateComponent,
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
   */
  view(data){
    const drawerRef = this.nzDrawerService.create<ProjectManageArchivesViewComponent, { id: string }, string>({
      nzTitle: this.i18NService.fanyi("table.view"),//详情标题
      nzContent: ProjectManageArchivesViewComponent,
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
   * 删除按钮
   */
  delete(id){
    let projectManageArchives=new ProjectManageArchives();
    projectManageArchives.id=id;
    this.projectManageArchivesService.delete(projectManageArchives).then((response)=>{
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
