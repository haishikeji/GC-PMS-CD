import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
// 以下新增
import { NzModalRef, NzMessageService, NzNotificationService, NzI18nService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseSalesStatus } from 'app/entity/basedata/base-sales-status';
import { BaseSalesStatusService } from 'app/services/basedata/base-sales-status.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-sales-status-add',
  templateUrl: './add.component.html',
})
export class BasedataSalesStatusAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseSalesStatusService: BaseSalesStatusService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [{ value: '', disabled: true }, []], //销售编码
      name: [null, [Validators.required]], //销售名称
      status: [null], //是否启用
      sort: ['number', [Validators.required]],
    });
    //新增子集获取父节点id
    // if(this.parentId&&this.parentId!=="0"){
    this.baseSalesStatus.parentId = this.parentId;
    // }
  }

  validateForm!: FormGroup;
  parentId = ''; //父级id parentId = '0';
  status = true; //是否启用

  // 确定 按钮（添加一级）
  submitForm(): any {
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        console.log('valid有效--->', valid);
        //判断启用
        if (this.status) {
          // console.log(this.status);
          this.baseSalesStatus.status = '1';
        } else {
          this.baseSalesStatus.status = '0';
        }
        this.baseSalesStatus.pkOrg = sessionStorage.getItem('pkOrg'); //组织
        this.baseSalesStatusService.add(this.baseSalesStatus).then(response => {
          if (response.success) {
            // console.log(response);
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

  //关闭
  close() {
    this.modal.destroy();
  }
  //实例化函数
  baseSalesStatus: BaseSalesStatus = {};
}
