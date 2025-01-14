import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { ProWorkLogicService } from 'app/services/project-work/pro-work-logic.service';
import { I18NService } from '@core';
import { ProWorkLogic } from 'app/entity/project-work/pro-work-logic';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { recursiveQuery } from '@shared';

@Component({
  selector: 'app-project-work-implementation-log-update',
  templateUrl: './update.component.html',
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
export class ProjectWorkImplementationLogUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private datePipe: DatePipe,
    private projectManageArchivesService: ProjectManageArchivesService,
    private personnelService: PersonnelService,
    private proWorkLogicService: ProWorkLogicService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
    private drawerRef: NzDrawerRef,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      billcode: [{ value: '', disabled: true }],
      proId: [null, [Validators.required]],
      // date: [null, [Validators.required]],
      reporterId: [null, [Validators.required]],
      startDate:[null,[Validators.required]],
      endDate:[null,[Validators.required]]
    });
    //项目下拉
    this.isLoadingSave = true;
    this.getProList()
      .then(() => {
        //人员下来数据
        return this.getPersonnelList();
      }).then(()=>{
        //根据id查询
        return this.getById();
      })
      .then(() => {
        this.isLoadingSave = false;
      });
  }

  isLoadingSave = false;
  validateForm!: FormGroup;
  proWorkLogic: ProWorkLogic = {
  }; //对象
  proList = []; //项目下拉数据
  personnelList = []; //汇报人下拉数据
  itemList = []; //明细集合
  mieList = []; //里程碑数据下拉
  date = null;
  id="";

  /**
   * 开始时间禁用事件
   */
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    if(this.proWorkLogic.endDate){
      let end=new Date(this.proWorkLogic.endDate);//结束时间
      //开始时间大于结束时间的禁用
      return current.getTime()>end.getTime();
    }else{
      return false;
    }
  };

  /**
   * 结束
   * 时间禁用事件
   */
  disabledDate2 = (current: Date): boolean => {
    // Can not select days before today and today
    if(this.proWorkLogic.startDate){
      let start=new Date(this.proWorkLogic.startDate);//开始时间
      //结束时间小于开始时间禁用
      return current.getTime()<start.getTime();
    }else{
      return false;
    }
  };
  /**
   * 根据id查询
   */
  getById(){
    return new Promise((resolve)=>{
      this.proWorkLogicService.getListById(this.id).then((response)=>{
        if(response.result){
          this.proWorkLogic=response.result;//主表对象
          this.itemList=response.result.detailList;//明细数组
          //最大排序
          if(this.itemList){
            this.sort=this.itemList.length+1;
          }
          //开始时间-结束时间
          this.date=[new Date(this.proWorkLogic.startDate),new Date(this.proWorkLogic.endDate)]
        }
        resolve();
      })
    })
  }

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
   * 项目下拉选择事件
   */
  proChange(event) {
    this.getMieList(event);
  }

  /**
   * 获取汇报人下拉数据
   */
  getPersonnelList() {
    return new Promise(resolve => {
      this.personnelService.queryApprover(sessionStorage.getItem('pkOrg')).then(response => {
        if (response.result) {
          this.personnelList = JSON.parse(JSON.stringify(response.result));
        }
        recursiveQuery(this.personnelList);
        resolve();
      });
    });
  }

  /**
   * 里程碑数据下拉
   */
  getMieList(proArchivesId) {
    return new Promise(resolve => {
      let plan = { id: proArchivesId, planType: '2' };
      this.projectManageArchivesService.getPlanListById(plan).then(response => {
        if (response.result) {
          this.mieList = response.result;
        }
        resolve();
      });
    });
  }

  /**
   * 里程碑选择事件
   */
  proArchivesIdChange(data) {
    console.log(data.proArchivesId);
    //是否选择里程碑
    if (data.proArchivesId) {
      this.getChild(this.mieList, data);
    } else {
      data.proArchivesMilestone = '';
      data.proArchivesId = '';
    }
  }

  /**
   * 递归查询名称
   */
  getChild(mieList, data) {
    mieList.forEach(element => {
      if (element.key === data.proArchivesId) {
        data.proArchivesMilestone = element.title;
        data.proArchivesId = element.key;
        data.proPlanId=element.id;
      } else {
        if (element.children) {
          this.getChild(element.children, data);
        }
      }
    });
  }

  /**
   * 增行按钮
   */
  sort = 0;
  addRow() {
    this.itemList = [
      ...this.itemList,
      {
        sort: this.sort,
      },
    ];
    this.sort++;
  }

  /**
   * 删除行
   */
  deleteRow(sort) {
    this.itemList = this.itemList.filter(d => d.sort !== sort);
  }

  /**
   * 保存按钮
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        this.isLoadingSave = true;
        // this.proWorkLogic.type = '2'; //实施
        this.proWorkLogic.pkOrg = sessionStorage.getItem('pkOrg');
        //项目名称
        if (this.proWorkLogic.proId) {
          this.proList.forEach(element => {
            if (element.id === this.proWorkLogic.proId) {
              this.proWorkLogic.proName = element.proName;
            }
          });
        } else {
          this.proWorkLogic.proName = '';
        }
        //汇报人名称
        if (this.proWorkLogic.reporterId) {
          //循环集合数据获取名称
          this.personnelList.forEach(pkOrg => {
            pkOrg.children.forEach(depart => {
              depart.children.forEach(personnel => {
                if (personnel.key === this.proWorkLogic.reporterId) {
                  this.proWorkLogic.reporter = personnel.name;
                }
              });
            });
          });
        } else {
          this.proWorkLogic.reporter = '';
        }
        //时间格式化
        // this.proWorkLogic.startDate = this.datePipe.transform(this.date[0], 'yyyy-MM-dd HH:mm:ss');
        // this.proWorkLogic.endDate = this.datePipe.transform(this.date[1], 'yyyy-MM-dd HH:mm:ss');
        this.proWorkLogic.startDate = this.datePipe.transform(this.proWorkLogic.startDate, 'yyyy-MM-dd HH:mm:ss');
        this.proWorkLogic.endDate = this.datePipe.transform(this.proWorkLogic.endDate, 'yyyy-MM-dd HH:mm:ss');
        //判断两个时间差的工时是否大于明细总工时
        if (!this.getHourBoole()) {
          this.nzNotificationService.warning('工作用时不得大于开始时间与结束时间之差', '');
          this.isLoadingSave = false;
          return;
        }
        //子表\
        //判断是否输入子表数据
        if (this.itemList && this.itemList.length > 0) {
          this.proWorkLogic.detailList = this.itemList;
        } else {
          this.nzNotificationService.warning('工作内容必填', '');
          this.isLoadingSave = false;
          return;
        }
        this.proWorkLogicService.update(this.proWorkLogic).then(response => {
          if (response.success) {
            //保存成功
            this.isLoadingSave = false;
            this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
            this.drawerRef.close(true);
            resolve();
          } else {
            //保存失败
            this.isLoadingSave = false;
            this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
          }
        });
      }
    });
  }

  /**
   * 判断两个时间差的工时是否大于明细总工时
   */
  getHourBoole(): boolean {
    //明细总工时
    let itemHour = 0;
    //两个时间差
    let dateHour = this.getInervalHour(new Date(this.proWorkLogic.startDate), new Date(this.proWorkLogic.endDate));
    //循环获取明细的总工时
    this.itemList.forEach(element => {
      if (element.duration) {
        itemHour = itemHour + Number(element.duration);
      }
    });
    return dateHour >= itemHour;
  }

  /**
   * 获取两个时间差
   */
  getInervalHour(startDate, endDate) {
    var ms = endDate.getTime() - startDate.getTime();
    if (ms < 0) return 0;
    return Math.floor(ms / 1000 / 60 / 60);
  }

  close() {
    this.drawerRef.close();
  }
}
