import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

import { BasedataMerchantsIndustryAddComponent } from './add/add.component';
import {
  NzModalService,
  NzTreeNode,
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzNotificationService,
} from 'ng-zorro-antd';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseCustomerIndustry } from 'app/entity/basedata/base-customer-industry';
import { BaseCustomerIndustryService } from 'app/services/basedata/base-customer-industry.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-merchants-industry',
  templateUrl: './merchants-industry.component.html',
})
export class BasedataMerchantsIndustryComponent implements OnInit {
  constructor(
    private nzDropdownService: NzDropdownService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private baseCustomerIndustryService: BaseCustomerIndustryService,
    private i18NService: I18NService,
    private nzNotificationService: NzNotificationService,
  ) {}

  ngOnInit() {
    //初始化右侧表单
    this.validateForm = this.fb.group({
      code: [{ value: '', disabled: true }],
      name: [null, [Validators.required]],
      status: [null],
      sort:[null, [Validators.required]],
    });
    this.getListIndustryTree();
  }

  validateForm!: FormGroup;
  dropdown: NzDropdownContextComponent;
  searchValue = ''; //搜索框的值
  nodes: any = []; //tree集合
  status = true;
  sort:''

  //  客商行业 字段规范
  baseCustomerIndustry: BaseCustomerIndustry = {};

  //查询 客商行业 树
  getListIndustryTree() {
    let baseCustomerIndustry = new BaseCustomerIndustry();
    baseCustomerIndustry.pkOrg = sessionStorage.getItem('pkOrg');
    // 带参 查询 请求
    this.baseCustomerIndustryService.getTreeList(baseCustomerIndustry).then(res => {
      this.nodes = res.result;
      console.log('客商树 数据', this.nodes);
    });
  }

  //双击节点自动打开树分支
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  //右键树节点
  id = '';
  contextMenu(Fid, $event: MouseEvent, template: TemplateRef<void>): void {
    this.id = Fid; //获取id
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  //树节点点击事件
  treeClick(event) {
    var getdDepart = event.node.origin; //当前点击的对象
    if (getdDepart.status == '0') {
      //是否启用
      this.status = false;
    } else {
      this.status = true;
    }
    //赋值给修改表单
    this.baseCustomerIndustry = {
      name: getdDepart.title,
      code: getdDepart.code,
      id: getdDepart.key,
      parentId: getdDepart.parentId,
      sort: getdDepart.sort,
    };
  }

  //右键新增子集按钮
  addChild() {
    const modalRef = this.modalService.create({
      nzTitle: '新增',
      nzContent: BasedataMerchantsIndustryAddComponent,
      nzWidth: 600,
      nzComponentParams: {
        parentId: this.id,
      },
      nzFooter: [
        {
          label: '关闭',
          type: 'default',
          onClick: addModel => {
            addModel.close();
          },
        },
        {
          label: '确定',
          type: 'primary',
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(() => {
              this.getListIndustryTree();
            });
          },
        },
      ],
    });
  }

  //右键取消
  cancel() {
    this.dropdown.close();
  }

  //添加一级 弹框
  add() {
    const modalRef = this.modalService.create({
      nzTitle: '新增',
      nzContent: BasedataMerchantsIndustryAddComponent,
      nzWidth: 600,
      nzFooter: [
        {
          label: '关闭',
          type: 'default',
          onClick: addModel => {
            addModel.close();
          },
        },
        {
          label: '确定',
          type: 'primary',
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(() => {
              this.getListIndustryTree(); //新增后刷新 树
            });
          },
        },
      ],
    });
  }

  //根据id删除对应项
  delete() {
    let baseCustomerIndustry = new BaseCustomerIndustry();
    baseCustomerIndustry.id = this.id;
    this.baseCustomerIndustryService.delete(this.id).then(response => {
      if (response.success) {
        //删除成功
        this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
        this.dropdown.close();
        this.getListIndustryTree();
      } else {
        //删除失败
        this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
      }
    });
  }
  reset() {
    this.baseCustomerIndustry = {};
  }

  // 保存 （右侧）
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let valid = this.validateForm.valid;
    if (valid) {
      //是否启用
      if (this.status) {
        this.baseCustomerIndustry.status = '1';
      } else {
        this.baseCustomerIndustry.status = '0';
      }

      //修改
      this.baseCustomerIndustryService.update(this.baseCustomerIndustry).then(response => {
        if (response.success) {
          this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
          this.getListIndustryTree();
        } else {
          this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
        }
      });
    }
  }
}
