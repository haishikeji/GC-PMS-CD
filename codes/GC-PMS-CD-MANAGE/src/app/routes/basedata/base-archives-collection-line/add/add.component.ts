import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseArchivesCollectionLine } from 'app/entity/basedata/base-archives-collection-line';
import { BaseArchivesCollectionLineService } from 'app/services/basedata/base-archives-collection-line.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-base-archives-collection-line-add',
  templateUrl: './add.component.html',
})
export class BasedataBaseArchivesCollectionLineAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseArchivesCollectionLineService: BaseArchivesCollectionLineService,
    private nzNotificationService: NzNotificationService,
    private i18NService: I18NService,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
    //修改进入
    if(this.id){
      this.baseArchivesCollectionLine.id=this.id;
      this.getById();
    }
  }

  validateForm!: FormGroup;
  baseArchivesCollectionLine: BaseArchivesCollectionLine = {}; //对象
  id = '';

  /**
   * 根据id查询
   */
  getById(){
    this.baseArchivesCollectionLineService.getById(this.id).then((response)=>{
      this.baseArchivesCollectionLine=response.result;
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
          this.baseArchivesCollectionLine.pkOrg=sessionStorage.getItem("pkOrg");//组织
          //新增
          this.baseArchivesCollectionLineService.add(this.baseArchivesCollectionLine).then((response)=>{
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
        } else {
          //修改
          this.baseArchivesCollectionLineService.update(this.baseArchivesCollectionLine).then((response)=>{
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

  close() {
    this.modal.destroy();
  }
}
