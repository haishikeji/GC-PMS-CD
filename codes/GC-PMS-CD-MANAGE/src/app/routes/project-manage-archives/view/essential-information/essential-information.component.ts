import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';

@Component({
  selector: 'app-project-manage-archives-view-essential-information',
  templateUrl: './essential-information.component.html',
})
export class ProjectManageArchivesViewEssentialInformationComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit(): void {
  }

  projectManageArchivesa: ProjectManageArchives = {};
}
