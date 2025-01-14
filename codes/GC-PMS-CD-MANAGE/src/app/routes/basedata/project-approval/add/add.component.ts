import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService, NzI18nService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseArchivesProjectApproval } from 'app/entity/basedata/base-archives-project-approval';
import { BaseArchivesProjectApprovalService } from 'app/services/basedata/base-archives-project-approval.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-project-approval-add',
  templateUrl: './add.component.html',
})
export class BasedataProjectApprovalAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseArchivesProjectApprovalService: BaseArchivesProjectApprovalService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [{ value: '', disabled: true }, []],
      name: [null, [Validators.required]],
      status: [null],
    });
    //新增子集获取父节点id
    // if(this.parentId&&this.parentId!=="0"){
    this.baseArchivesProjectApproval.parentId = this.parentId;
    // }
  }

  validateForm!: FormGroup;
  parentId = '0'; //父级id
  status = true;

  /**
   * 提交按钮
   */
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        //格式化是否期用
        if (this.status) {
          this.baseArchivesProjectApproval.status = '1';
        } else {
          this.baseArchivesProjectApproval.status = '0';
        }
        this.baseArchivesProjectApproval.pkOrg = sessionStorage.getItem('pkOrg'); //组织
        this.baseArchivesProjectApprovalService.add(this.baseArchivesProjectApproval).then(response => {
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
      }
    });
  }

  //实体
  baseArchivesProjectApproval: BaseArchivesProjectApproval = {};

  /**
   * 关闭按钮
   */
  close() {
    this.modal.destroy();
  }
}
