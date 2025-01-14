import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DictService } from 'app/services/dict.service';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-base-archives-milestone-add',
  templateUrl: './add.component.html',
})
export class BasedataBaseArchivesMilestoneAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private dictService: DictService,
    private baseArchivesMilestoneService: BaseArchivesMilestoneService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
    });
    //获取类别数据字典
    this.getTypeList();
    //id不等于空则是修改，需要查询修改数据
    if (this.id) {
      this.getById();
    }
    //如果不为空则获取类型id
    if (this.typeId) {
      this.baseArchivesMilestone.typeId = this.typeId;
    }
    this.baseArchivesMilestone.parentId = this.parentId;
  }

  validateForm!: FormGroup;
  parentId = '0'; //父级id
  id = ''; //主键
  typeId = ''; //类型id
  //里程碑档案实体
  baseArchivesMilestone: BaseArchivesMilestone = {};

  /**
   * 获取类别数据字典
   */
  typeList: any[] = [];
  getTypeList() {
    this.dictService.getByDictCode('base_archives_milestone_type').then(response => {
      this.typeList = response.result;
    });
  }

  /**
   * 根据id查询里程碑对象
   */
  getById() {
    this.baseArchivesMilestoneService.getById(this.id).then((response)=>{
      this.baseArchivesMilestone=response.result
    })
    // this.baseArchivesMilestone = {
    //   key: `1-1`,
    //   code: '001',
    //   name: '启动1',
    //   type: '1',
    // };
  }

  /**
   * 保存提交按钮
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        if (!this.id) {
          //类型名称
          this.typeList.forEach(element => {
            if(this.baseArchivesMilestone.typeId===element.value){
              this.baseArchivesMilestone.type=element.text
            }
          });
          this.baseArchivesMilestone.pkOrg=sessionStorage.getItem("pkOrg");//组织
          //新增
          this.baseArchivesMilestoneService.add(this.baseArchivesMilestone).then(response => {
            if (response.success) {
              //保存成功
              this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
              this.modal.destroy();
              resolve();
            } else {
              //保存失败
              this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
            }
          });
        } else {
          this.baseArchivesMilestoneService.update(this.baseArchivesMilestone).then((response)=>{
            if (response.success) {
              //保存成功
              this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
              this.modal.destroy();
              resolve();
            } else {
              //保存失败
              this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
            }
          })
        }
      }
    });
  }

  /**
   * 关闭按钮
   */
  close() {
    this.modal.destroy();
  }
}
