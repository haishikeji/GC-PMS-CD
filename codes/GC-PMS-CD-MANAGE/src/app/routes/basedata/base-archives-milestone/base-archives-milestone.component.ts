import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';
import { DictService } from 'app/services/dict.service';
import { Dict } from 'app/entity/dict';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { BasedataBaseArchivesMilestoneAddComponent } from './add/add.component';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { I18NService } from '@core';
export interface TreeNodeInterface {
  key: string;
  code: string;
  name?: string;
  type?: string;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
  level?: number;
}
@Component({
  selector: 'app-basedata-base-archives-milestone',
  templateUrl: './base-archives-milestone.component.html',
})
export class BasedataBaseArchivesMilestoneComponent implements OnInit {
  constructor(private dictService: DictService, private nzNotificationService: NzNotificationService,
    private modalService:NzModalService,
    private baseArchivesMilestoneService:BaseArchivesMilestoneService,
    private i18NService:I18NService
    ) {}

  ngOnInit() {
    this.getTypeList();
  }
  listOfMapData:any = [];
  //里程碑档案实体
  baseArchivesMilestone: BaseArchivesMilestone = {};

  /**
   * 获取类别数据字典
   */
  typeList: any[] = [];
  getTypeList() {
    this.dictService.getByDictCode('base_archives_milestone_type').then(response => {
      this.typeList = response.result;
    });
  }

  /**
   * 查询按钮
   */
  query() {
    if (this.baseArchivesMilestone.typeId) {
      this.getTreeList();
    } else {
      this.nzNotificationService.warning('请选择类别', '');
    }
  }

  /**
   * 获取树形集合
   */
  getTreeList() {
    this.baseArchivesMilestone.pkOrg=sessionStorage.getItem("pkOrg");//组织
    this.baseArchivesMilestoneService.getTreeList(this.baseArchivesMilestone).then((response)=>{
      if(response.result){
        this.listOfMapData=response.result
      }else{
        this.listOfMapData=[];
      }
      this.getLoding();
    })

    // this.listOfMapData = [
    //   {
    //     key: `1`,
    //     code: '001',
    //     name: '项目启动',
    //     type: '开发',
    //     children: [
    //       {
    //         key: `1-1`,
    //         code: '001',
    //         name: '启动1',
    //         type: '开发',
    //       },
    //     ],
    //   },
    //   {
    //     key: `2`,
    //     code: '002',
    //     name: '蓝图设计',
    //     type: '实施',
    //   },
    // ];
    
  }

  getLoding(){
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  /**
   * 新增一级
   */
  add(){
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: BasedataBaseArchivesMilestoneAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        // parentId:this.id
        typeId:this.baseArchivesMilestone.typeId
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
              this.getTreeList();
            })
          }
        }
      ]
    })
  }

  /**
   * 新增子级
   * @param item 里程碑对象
   */
  addChild(item){
    const modalRef = this.modalService.create({
      nzTitle: "新增",
      nzContent: BasedataBaseArchivesMilestoneAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        parentId:item.key,
        typeId:this.baseArchivesMilestone.typeId
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
              this.getTreeList();
            })
          }
        }
      ]
    })
  }

  /**
   * 修改
   * @param item 里程碑实体
   */
  update(item){
    const modalRef = this.modalService.create({
      nzTitle: "修改",
      nzContent: BasedataBaseArchivesMilestoneAddComponent,
      nzWidth: 600,
      nzComponentParams:{
        id:item.key
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
              this.getTreeList();
            })
          }
        }
      ]
    })
  }

  /**
   * 删除按钮
   */
  delete(id){
    let baseArchivesMilestone=new BaseArchivesMilestone();
    baseArchivesMilestone.id=id
    this.baseArchivesMilestoneService.delete(baseArchivesMilestone).then((response)=>{
      if (response.success) {
        //删除成功
        this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
        this.getTreeList();
      } else {
        //删除失败
        this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
      }
    })
  }

  ///////////////////////////树形配置
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: true, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
}
