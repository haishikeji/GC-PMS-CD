import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';

@Component({
  selector: 'app-project-manage-archives-view-business-affairs',
  templateUrl: './business-affairs.component.html',
})
export class ProjectManageArchivesViewBusinessAffairsComponent implements OnInit {
  

  constructor(
  ) { }

  ngOnInit(): void {
  }

  projectManageArchives: ProjectManageArchives = {}; //项目档案实体对象
  collectionPlanList = []; //收款计划数据
  paymentCollectionList = []; //回款情况数据
  paymentPlanList = []; //付款计划
  paymentStatusList = []; //付款情况
  
}
