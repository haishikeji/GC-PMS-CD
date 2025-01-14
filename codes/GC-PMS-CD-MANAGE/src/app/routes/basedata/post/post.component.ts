import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {
  NzTreeNode,
  NzFormatEmitEvent,
  NzDropdownService,
  NzDropdownContextComponent,
  NzModalService,
  NzNotificationService,
} from 'ng-zorro-antd';
import { BaseArchivesPost } from 'app/entity/basedata/base-archives-post';
import { BasedataPostAddComponent } from './add/add.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseArchivesPostService } from 'app/services/basedata/base-archives-post.service';

@Component({
  selector: 'app-basedata-post',
  templateUrl: './post.component.html',
})
export class BasedataPostComponent implements OnInit {
  constructor(
    private nzDropdownService: NzDropdownService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private baseArchivesPostService: BaseArchivesPostService,
    public settings: SettingsService,
    private nzNotificationService: NzNotificationService,
  ) {}

  ngOnInit() {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      status: [null],
    });
    this.getListContractTree();
  }
  validateForm!: FormGroup;
  dropdown: NzDropdownContextComponent;
  searchValue = ''; //搜索框的值
  nodes: any = []; //合同分类tree集合
  status = true;

  //查询tree合同类型
  getListContractTree() {
    //查询条件
    let baseArchivesPost = new BaseArchivesPost();
    baseArchivesPost.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.baseArchivesPostService.getTreeList(baseArchivesPost).then(response => {
      this.nodes = response.result;
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
    this.baseArchivesPost = {
      name: getdDepart.title,
      code: getdDepart.code,
      id: getdDepart.key,
    };
  }

  //右键取消
  cancel() {
    this.dropdown.close();
  }

  /**
   * 新增一级按钮
   */
  baseArchivesPost: BaseArchivesPost = {};
  add() {
    const modalRef = this.modalService.create({
      nzTitle: '新增',
      nzContent: BasedataPostAddComponent,
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
              this.getListContractTree();
            });
          },
        },
      ],
    });
  }

  /**
   * 右键新增子集按钮
   */
  addChild() {
    const modalRef = this.modalService.create({
      nzTitle: '新增',
      nzContent: BasedataPostAddComponent,
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
              this.getListContractTree();
            });
          },
        },
      ],
    });
  }

  // 右侧 重置
  reset() {
    // this.baseArchivesPost = {}; 这样会情况掉 id 不可取
    this.baseArchivesPost.code = '';
    this.baseArchivesPost.name = '';
  }

  /**
   * 删除
   */
  delete() {
    let baseArchivesPost = new BaseArchivesPost();
    baseArchivesPost.id = this.id;
    this.baseArchivesPostService.delete(baseArchivesPost).then(response => {
      if (response.success) {
        this.dropdown.close();
        this.nzNotificationService.success('删除成功', '');
        this.getListContractTree();
      } else {
        this.nzNotificationService.error('删除失败', response.message);
      }
    });
  }
  /**
   * 修改保存
   */
  submitForm() {
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
      this.baseArchivesPostService.update(this.baseArchivesPost).then(response => {
        if (response.success) {
          this.nzNotificationService.success('修改成功', '');
          this.getListContractTree();
        } else {
          this.nzNotificationService.error('修改失败', response.message);
        }
      });
    }
  }
}
