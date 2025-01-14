import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';
import { BaseArchivesCost } from 'app/entity/basedata/base-archives-cost';
import { BaseArchivesCostService } from 'app/services/basedata/base-archives-cost.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-base-archives-cost-add',
  templateUrl: './add.component.html',
})
export class BasedataBaseArchivesCostAddComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseArchivesCostService: BaseArchivesCostService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [{ value: '', disabled: true }],
      name: [null, [Validators.required]],
    });
    //修改进入获取id
    if(this.id){
      this.baseArchivesCost.id=this.id;
      this.getById();
    }
  }

  validateForm!: FormGroup;
  baseArchivesCost: BaseArchivesCost = {}; //对象
  id = '';

  /**
   * 根据id查询
   */
  getById(){
    this.baseArchivesCostService.getById(this.id).then((response)=>{
      this.baseArchivesCost=response.result;
    })
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
          this.baseArchivesCost.pkOrg = sessionStorage.getItem('pkOrg');
          //新增
          this.baseArchivesCostService.add(this.baseArchivesCost).then(response => {
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
          //修改
          this.baseArchivesCostService.update(this.baseArchivesCost).then(response => {
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
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
