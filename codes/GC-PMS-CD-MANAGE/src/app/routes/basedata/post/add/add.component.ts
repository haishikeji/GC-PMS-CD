import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseArchivesPost } from 'app/entity/basedata/base-archives-post';
import { BaseArchivesPostService } from 'app/services/basedata/base-archives-post.service';

@Component({
  selector: 'app-basedata-post-add',
  templateUrl: './add.component.html',
})
export class BasedataPostAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private baseArchivesPostService: BaseArchivesPostService,
    private nzNotificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      // status: [null],
    });
    if(this.parentId){
      this.baseArchivesPost.parentId=this.parentId;
    }
  }

  validateForm!: FormGroup;
  parentId = ''; //父级id
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
          this.baseArchivesPost.status = '1';
        } else {
          this.baseArchivesPost.status = '0';
        }
        //组织
        this.baseArchivesPost.pkOrg=sessionStorage.getItem("pkOrg");
        this.baseArchivesPostService.add(this.baseArchivesPost).then(response => {
          if (response.success) {
            this.nzNotificationService.success('新增成功', '');
            resolve();
            this.modal.destroy();
          } else {
            this.nzNotificationService.error('新增失败', response.message);
          }
        });
      }
    });
  }

  //实体
  baseArchivesPost: BaseArchivesPost = {};

  /**
   * 关闭按钮
   */
  close() {
    this.modal.destroy();
  }
}
