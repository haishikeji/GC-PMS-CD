import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDropdownService, NzModalService, NzDropdownContextComponent, NzTreeNode, NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseArchivesProjectApproval } from 'app/entity/basedata/base-archives-project-approval';
import { BasedataProjectApprovalAddComponent } from './add/add.component';
import { BaseArchivesProjectApprovalService } from 'app/services/basedata/base-archives-project-approval.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-project-approval',
  templateUrl: './project-approval.component.html',
})
export class BasedataProjectApprovalComponent implements OnInit {
  
  constructor(
    private nzDropdownService: NzDropdownService,
    private modalService:NzModalService,
    private fb: FormBuilder,
    private baseArchivesProjectApprovalService:BaseArchivesProjectApprovalService,
    private nzNotificationService:NzNotificationService,
    private i18NService:I18NService
  ) { }

  ngOnInit() {
    //初始化表单
    this.validateForm = this.fb.group({
      code: [{value:"",disabled:true}],
      name: [null, [Validators.required]],
      status:[null]
    });
    this.getListContractTree()
   }

   validateForm!: FormGroup;
  dropdown: NzDropdownContextComponent;
  searchValue = "";//搜索框的值
  nodes: any=[];//tree集合
  status=true;

   //查询tree合同类型
   getListContractTree() {
    // this.contractClassService.getAllContractClass1().then((response) => {
    //   this.nodes = response.result
    // })
    let baseArchivesProjectApproval=new BaseArchivesProjectApproval();
    baseArchivesProjectApproval.pkOrg=sessionStorage.getItem("pkOrg");
    this.baseArchivesProjectApprovalService.getTreeList(baseArchivesProjectApproval).then((response)=>{
      this.nodes=response.result;
    })
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
  id="";
  contextMenu(Fid, $event: MouseEvent, template: TemplateRef<void>): void {
    this.id = Fid;//获取id
    this.dropdown = this.nzDropdownService.create($event, template);
  }


  //树节点点击事件
  treeClick(event) {
    var getdDepart = event.node.origin;//当前点击的对象
    if(getdDepart.status=="0"){//是否启用
      this.status=false;
    }else{
      this.status=true;
    }
    //赋值给修改表单
    this.baseArchivesProjectApproval = {
      name: getdDepart.title,
      code: getdDepart.code,
      id: getdDepart.key,
      parentId:getdDepart.parentId
    }
  }

  //右键取消
  cancel() {
    this.dropdown.close()
  }

  //项目立项实体
  baseArchivesProjectApproval:BaseArchivesProjectApproval={};



  /**
   * 新增一级按钮
   */
  add() {
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: BasedataProjectApprovalAddComponent,
      nzWidth: 600,
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(()=>{
              this.getListContractTree();
            })
          }
        }
      ]
    })
  }

  /**
   * 右键新增子集按钮
   */
  addChild(){
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: BasedataProjectApprovalAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        parentId:this.id
      },
      nzFooter: [
        {
          label: "关闭",
          type: "default",
          onClick: addModel => {
            addModel.close()
          }
        },
        {
          label: "确定",
          type: "primary",
          // loading:this.modelSaveLoading,
          onClick: addModel => {
            addModel.submitForm().then(()=>{
              this.getListContractTree();
            })
          }
        }
      ]
    })
  }

  reset(){
    this.baseArchivesProjectApproval={}
  }

  /**
   * 删除
   */
  delete(){
    let baseArchivesProjectApproval=new BaseArchivesProjectApproval();
    baseArchivesProjectApproval.id=this.id;
    this.baseArchivesProjectApprovalService.delete(baseArchivesProjectApproval).then((response)=>{
      if (response.success) {
        //删除成功
        this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
        this.dropdown.close()
        this.getListContractTree();
      } else {
        //删除失败
        this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
      }
    })
  }
  /**
   * 修改保存
   */
  submitForm(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let valid = this.validateForm.valid;
    if(valid){
      //格式化是否期用
      if(this.status){
        this.baseArchivesProjectApproval.status="1"
      }else{
        this.baseArchivesProjectApproval.status="0"
      }
      this.baseArchivesProjectApprovalService.update(this.baseArchivesProjectApproval).then((response)=>{
        if (response.success) {
          //保存成功
          this.nzNotificationService.success(this.i18NService.fanyi('save.ok'), '');
          this.getListContractTree();
        } else {
          //保存失败
          this.nzNotificationService.error(this.i18NService.fanyi('save.not'), '');
        }
      })
    }
  }
}
