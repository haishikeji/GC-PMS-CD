import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
// import { STColumn, STComponent } from '@delon/abc';
// import { SFSchema } from '@delon/form';
// 以下新增
import { NzModalRef, NzMessageService, NzNotificationService, NzI18nService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseCustomerIndustry } from 'app/entity/basedata/base-customer-industry';
import { BaseCustomerIndustryService } from 'app/services/basedata/base-customer-industry.service';
import { I18NService } from '@core';
// import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-basedata-merchants-industry-add',
  templateUrl: './add.component.html',
})
export class BasedataMerchantsIndustryAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseCustomerIndustryService: BaseCustomerIndustryService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [{ value: '', disabled: true }, []], //客商编码
      name: [null, [Validators.required]], //客商名称
      status: [null], //是否启用
      sort: ['number', [Validators.required]], //数字输入框 客商名称排序
    });
    //新增子集获取父节点id
    // if(this.parentId&&this.parentId!=="0"){
    this.baseCustomerIndustry.parentId = this.parentId;
    // }
  }

  validateForm!: FormGroup;
  parentId = '0'; //父级id
  status = true; //是否启用

  // 确定 按钮（添加一级）
  submitForm(): any {
    // console.log('----');
    return new Promise(resolve => {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      let valid = this.validateForm.valid;
      if (valid) {
        console.log('valid有效--->', valid);
        //格式化是否期用
        if (this.status) {
          this.baseCustomerIndustry.status = '1';
        } else {
          this.baseCustomerIndustry.status = '0';
        }
        this.baseCustomerIndustry.pkOrg = sessionStorage.getItem('pkOrg'); //组织
        this.baseCustomerIndustryService.add(this.baseCustomerIndustry).then(response => {
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

  //关闭
  close() {
    this.modal.destroy();
  }
  //实例化函数
  baseCustomerIndustry: BaseCustomerIndustry = {};
}
