import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzDrawerRef, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { ProjectManageArchivesService } from 'app/services/project-manage-archives/project-manage-archives.service';
import { BaseArchivesCostService } from 'app/services/basedata/base-archives-cost.service';
import { ReExpenseSlipService } from 'app/services/expense-reimbursement/re-expense-slip.service';
import { I18NService } from '@core';
import { DatePipe } from '@angular/common';
import { ReExpenseSlip } from 'app/entity/expense-reimbursement/re-expense-slip';
import { recursiveQuery } from '@shared';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { BaseArchivesCost } from 'app/entity/basedata/base-archives-cost';
import { RoutesUploadDownloadComponent } from 'app/routes/upload-download/upload-download.component';

@Component({
  selector: 'app-expense-reimbursement-expense-reimbursement-form-update',
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
export class ExpenseReimbursementExpenseReimbursementFormUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private personnelService: PersonnelService,
    private projectManageArchivesService: ProjectManageArchivesService,
    private settingsService: SettingsService,
    private baseArchivesCostService: BaseArchivesCostService,
    private nzNotificationService:NzNotificationService,
    private reExpenseSlipService:ReExpenseSlipService,
    private i18NService:I18NService,
    private drawerRef:NzDrawerRef,
    private datePipe:DatePipe,
    private modalService:NzModalService
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      proId: [null, [Validators.required]],
      date: [null, [Validators.required]],
      personIds: [null, [Validators.required]],
    });
    this.isLoadingSave=true;
    //人员
    this.getPersonnelList().then(() => {
      return this.getProList(); //项目下拉
    }).then(()=>{
      return this.getCostIdList();//费用项目数据
    }).then(()=>{
      return this.getListById();//根据id查询
    }).then(()=>{
      this.isLoadingSave=false;
    });
  }

  isLoadingSave = false;
  validateForm!: FormGroup;
  reExpenseSlip: ReExpenseSlip = {
    producer: this.settingsService.user.realname,
  }; //对象
  proList = []; //项目集合
  personnelList = []; //人员集合
  id="";
  personIds=[];//人员绑定id

  /**
   * 根据id查询主子表数据
   */
  getListById(){
    return new Promise((resolve)=>{
      this.reExpenseSlipService.getListById(this.id).then((response)=>{
        this.reExpenseSlip=response.result;//主表
        this.personIds=this.reExpenseSlip.personId.split("、");//获取人员多选款数组绑定数据
        this.itemDataList=response.result.detailList;//子表明细
        if(this.itemDataList){
          this.sort=this.itemDataList.length+1;
        }
        resolve();
      })
    })
  }

  /**
   * 获取人员下拉数据到各个页签中
   */
  getPersonnelList() {
    return new Promise(resolve => {
      this.personnelService.queryApprover(sessionStorage.getItem('pkOrg')).then(response => {
        //人员
        this.personnelList = JSON.parse(JSON.stringify(response.result));
        recursiveQuery(this.personnelList);
        resolve();
      });
    });
  }

  /**
   * 获取项目下拉数据
   */
  getProList() {
    return new Promise(resolve => {
      //查询条件
      let projectManageArchives = new ProjectManageArchives();
      projectManageArchives.pageSize = 20000;
      projectManageArchives.pkOrg = sessionStorage.getItem('pkOrg');
      //查询
      this.projectManageArchivesService.getList(projectManageArchives).then(response => {
        if (response.result.records) {
          this.proList = response.result.records;
        }
        resolve();
      });
    });
  }

  /**
   * 增行按钮
   */
  itemDataList = []; //明细集合
  sort = 0;
  addRow() {
    this.itemDataList = [
      ...this.itemDataList,
      {
        price: '',
        uncoPrice: '',
        coPrice: '',
        sort: this.sort,
      },
    ];
    this.sort++;
  }

  /**
   * 删除行
   */
  deleteRow(sort) {
    this.itemDataList = this.itemDataList.filter(d => d.sort !== sort);
  }

  //金额格式化
  formatterDollar = (value: number) => {
    if (value) {
      return `$ ${value}`;
    } else {
      return `$ `;
    }
  };
  parserDollar = (value: string) => value.replace('$ ', '');

  /**
   * 查询费用档案数据
   */
  costIdList = []; //费用项目下拉数据集合
  getCostIdList() {
    return new Promise(resolve => {
      let baseArchivesCost = new BaseArchivesCost();
      baseArchivesCost.pkOrg = sessionStorage.getItem('pkOrg'); //组织
      baseArchivesCost.pageSize = 20000;
      this.baseArchivesCostService.getList(baseArchivesCost).then(response => {
        this.costIdList = response.result.records;
        resolve();
      });
    });
  }

  /**
   * 保存提交
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if(valid){
        this.isLoadingSave=true;
        this.reExpenseSlip.pkOrg=sessionStorage.getItem("pkOrg");//组织
        //日期
        this.reExpenseSlip.date = this.datePipe.transform(this.reExpenseSlip.date, 'yyyy-MM-dd HH:mm:ss');
        //人员名称
        if (this.personIds) {
          //循环集合数据获取名称
          let pids="";
          let pNames="";
          this.personnelList.forEach(pkOrg => {
            pkOrg.children.forEach(depart => {
              depart.children.forEach(personnel => {
                this.personIds.forEach(pid => {
                  if (personnel.key === pid) {
                    if(pids===""){
                      pids=personnel.key;
                      pNames=personnel.name;
                    }else{
                      pids=pids+"、"+personnel.key;
                      pNames=pNames+"、"+personnel.name;
                    }
                  }
                });
              });
            });
          });
          this.reExpenseSlip.personId=pids;
          this.reExpenseSlip.person=pNames;
        }
        //项目名称
        if(this.reExpenseSlip.proId){
          this.proList.forEach(element => {
            if(element.id===this.reExpenseSlip.proId){
              this.reExpenseSlip.proName=element.proName;
            }
          });
        }
        //明细
        if(this.itemDataList){
          this.itemDataList.forEach(element => {
            //获取明细中下拉选择的费用项目名称
            if(element.costId){
              this.costIdList.forEach(cost => {
                if(cost.id===element.costId){
                  element.costName=cost.name;
                }
              });
            }else{
              element.costName="";
            }
          });
          //获取明细数据
          this.reExpenseSlip.detailList=this.itemDataList;
        }else{
          this.nzNotificationService.warning('费用项目必填', '');
          this.isLoadingSave=false;
          return;
        }
        this.reExpenseSlipService.update(this.reExpenseSlip).then((response)=>{
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
        })
      }
    });
  }

  /**
   * 文件上传下来按钮
   */
  uploadDownload(data){
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: RoutesUploadDownloadComponent,
      nzWidth: 600,
      nzComponentParams:{
        fileList:data.files
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.save().then(()=>{
              data.files=addModel.uploadUrlList;//文件路径集合
            })
          }
        }
      ]
    })
  }

  close() {
    this.drawerRef.close();
  }
}
