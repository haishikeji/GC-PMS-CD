import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProWorkMilestoneService } from 'app/services/project-work/pro-work-milestone.service';
import { ProWorkMilestone } from 'app/entity/project-work/pro-work-milestone';
import { getFileListById } from '@shared/utils/file-show';

@Component({
  selector: 'app-project-work-service-milestone-confirm-view',
  templateUrl: './view.component.html',
  styles: [
    `
      .base {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 6px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
        z-index: 99;
      }
    `,
  ],
})
export class ProjectWorkServiceMilestoneConfirmViewComponent implements OnInit {
 

  constructor(
    private proWorkMilestoneService:ProWorkMilestoneService,
    private drawerRef:NzDrawerRef
  ) { }

  ngOnInit(): void {
    this.getById();
  }
  isLoadingSave=false;
  proWorkMilestone: ProWorkMilestone = {
  }; //对象
  id = '';
  fileList = [];

  /**
   * 根据id查询数据
   */
  getById() {
    this.isLoadingSave=true;
    this.proWorkMilestoneService.queryById(this.id).then(response => {
      if (response.success) {
        //表数据
        this.proWorkMilestone = response.result;
        //文件信息
        this.fileList=response.result.fileList;
        //获取文件格式
        getFileListById(this.fileList);
      }
      this.isLoadingSave=false;
    });
  }

  close() {
    this.drawerRef.close();
  }

}
