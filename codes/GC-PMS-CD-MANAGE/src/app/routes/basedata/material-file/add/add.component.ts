import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDrawerRef, NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { BaseMaterialFileClassification } from 'app/entity/basedata/base-material-file-classification';
import { BaseMaterialFileClassificationService } from 'app/services/basedata/base-material-file-classification.service';
import { I18NService } from '@core';
import { messageShared } from '@shared/utils/message';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basedata-material-file-add',
  templateUrl: './add.component.html',
})
export class BasedataMaterialFileAddComponent implements OnInit {
  @Input() isOne = 0; //标题
  @Input() materialId = ''; //分类id

  baseMaterialFileClassification: BaseMaterialFileClassification = {}; //物料分类对象

  validateForm!: FormGroup;
  sort: '';
  constructor(
    private baseMaterialFileClassificationService: BaseMaterialFileClassificationService,
    private notification: NzNotificationService,
    private i18NService: I18NService,
    private fb: FormBuilder,
    private nzNotificationService: NzNotificationService,
    private modal: NzModalRef,
  ) {}

  ngOnInit(): void {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]], //物料分类编码
      name: [null, [Validators.required]],
      sort: ['number', [Validators.required]], //数字输入框 客商名称排序
    });
    //修改
    if (this.isOne == 2) {
      this.getById(); //拿到修改的数据
    } else {
      this.baseMaterialFileClassification.parentId = this.materialId;
      // console.log(this.baseMaterialFileClassification.parentId);
    }
    // this.getAllDepart();
    // this.getProductList();
  }

  //根据id查询
  getById() {
    this.baseMaterialFileClassificationService.getById(this.materialId).then(res => {
      console.log('点击的物料分类对象', res);
      this.baseMaterialFileClassification = res.result;
    });
  }
  //物料分类 新增 修改 确定按钮
  submitForm() {
    //根据标题判断 新增 or 修改
    if (this.isOne == 2) {
      return new Promise(resolve => {
        //修改
        this.baseMaterialFileClassificationService.update(this.baseMaterialFileClassification).then(res => {
          if (res.success) {
            this.notification.success(this.i18NService.fanyi('successful.revision'), '');
            this.modal.destroy();
          } else {
            this.notification.error(
              this.i18NService.fanyi('modification.failed'),
              messageShared(this.i18NService, res.message),
            );
          }
          resolve();
        });
      });
    } else {
      //新增
      return new Promise(resolve => {
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
        let valid = this.validateForm.valid;
        if (valid) {
          console.log('valid有效--->', valid);
          this.baseMaterialFileClassification.pkOrg = sessionStorage.getItem('pkOrg'); //组织
          this.baseMaterialFileClassificationService.add(this.baseMaterialFileClassification).then(res => {
            if (res.success) {
              //保存成功
              this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
              console.log('>>>>', this.baseMaterialFileClassification);

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
  }

  // 产品 详情
  detailsPro() {}
  // 关闭
  close() {
    this.modal.destroy();
  }
}
