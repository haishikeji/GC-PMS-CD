import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { DatePipe } from '@angular/common';
import { ProWorkMilestoneService } from 'app/services/project-work/pro-work-milestone.service';
import { NzNotificationService, NzDrawerRef } from 'ng-zorro-antd';
import { I18NService } from '@core';
import { ProWorkMilestone } from 'app/entity/project-work/pro-work-milestone';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { environment } from '@env/environment';

@Component({
  selector: 'app-project-work-product-confirmation-add',
  templateUrl: './add.component.html',
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
export class ProjectWorkProductConfirmationAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private projectManageArchivesService: ProjectManageArchivesService,
    private datePipe: DatePipe,
    private proWorkMilestoneService:ProWorkMilestoneService,
    private nzNotificationService:NzNotificationService,
    private i18NService:I18NService,
    private drawerRef:NzDrawerRef,
    private settingsService:SettingsService
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      proId: [null, [Validators.required]],
      // mileId: [null, [Validators.required]],
      milSwitch: [null],
      confirmTime: [null, [Validators.required]],
    });
    //项目集合
    this.getProList().then(() => {});
  }

  validateForm!: FormGroup;
  proWorkMilestone: ProWorkMilestone = {
    currentUser: this.settingsService.user.realname,//当天填写人
    createTime: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')//当前时间
  }; //对象
  isLoadingSave = false; //加载
  proList = []; //项目下拉列表
  milSwitch = false; //里程碑确认空间

  /**
   * 获取项目下拉数据
   */
  getProList() {
    return new Promise(resolve => {
      let projectManageArchives = new ProjectManageArchives();
      projectManageArchives.pageSize = 20000;
      projectManageArchives.pkOrg = sessionStorage.getItem('pkOrg');
      this.projectManageArchivesService.getList(projectManageArchives).then(response => {
        if (response.result.records) {
          this.proList = response.result.records;
        }
        resolve();
      });
    });
  }

  /**
   * 项目选择事件
   * @param event 项目档案id
   */
  proChange(event) {
    if (event) {
      //根据id获取项目档案数据
      this.projectManageArchivesService.getListById(event).then(response => {
        if (response.success) {
          let project = JSON.parse(JSON.stringify(response.result)); //项目档案对象
          this.proWorkMilestone.proCode = project.proCode; //项目档案编码
          this.proWorkMilestone.proName = project.proName; //项目档案名称
          this.proWorkMilestone.cusId = project.cusId; //客户id
          this.proWorkMilestone.cusCode = project.cusCode; //客户编码
          this.proWorkMilestone.cusName = project.cusName; //客户名称
        }
      });
    }
  }


  fileList = [];

  handleChange(info: any): void {
    this.fileList = info.fileList;
    console.log(JSON.parse(JSON.stringify(this.fileList)))
    this.fileList.forEach(element => {
      if(!element.url&&element.response){
        element.url = environment.SERVER_URL + "sys/common/downloadFile/" + element.response.message
      }
    });
  }

  /**
   * 保存按钮
   */
  uploadUrlList = []; //传入后台的文件地址集合
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let valid = this.validateForm.valid;
    if (valid) {
      this.proWorkMilestone.type="4";
      this.proWorkMilestone.pkOrg=sessionStorage.getItem("pkOrg");
      //获取里程碑确认状态
      if (this.milSwitch) {
        this.proWorkMilestone.mileConfirm = 1;
      } else {
        this.proWorkMilestone.mileConfirm = 0;
      }
      //事件格式化
      this.proWorkMilestone.confirmTime = this.datePipe.transform(
        this.proWorkMilestone.confirmTime,
        'yyyy-MM-dd HH:mm:ss',
      );
      //文件集合
      this.getFileList();
      this.proWorkMilestone.fileList=this.uploadUrlList;
      this.proWorkMilestoneService.add(this.proWorkMilestone).then((response)=>{
        if (response.success) {
          //保存成功
          this.isLoadingSave = false;
          this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
          this.drawerRef.close(true);
        } else {
          //保存失败
          this.isLoadingSave = false;
          this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
        }
      })
    }
  }

  /**
   * 获取文件集合
   */
  getFileList() {
    if (this.fileList != null && this.fileList.length > 0) {
      this.fileList.forEach(element => {
        this.uploadUrlList = [
          ...this.uploadUrlList,
          {
            fileUrl: element.response.message, //文件地址
          }
        ];
      });
    }
  }

  close() {
    this.drawerRef.close();
  }

  //显示路径
  setAppendix(file: any) {
    const url = file.fileUrl;
    if (url != null && url !== '') {
      const idx = url.lastIndexOf('/');
      const fileUrl = url.slice(idx + 1);
      const index = fileUrl.lastIndexOf('_');
      const i = fileUrl.lastIndexOf('.');
      const fileName = fileUrl.substring(0, index);
      const fileSuffix = fileUrl.slice(i + 1);
      const f = fileName + '.' + fileSuffix;
      return f;
    }
    return '';
  }

}
