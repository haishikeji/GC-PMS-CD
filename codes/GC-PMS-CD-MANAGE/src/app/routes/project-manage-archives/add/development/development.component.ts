import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseArchivesMilestoneService } from 'app/services/basedata/base-archives-milestone.service';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { BaseArchivesMilestone } from 'app/entity/basedata/base-archives-milestone';
import { ProjectNodeTree } from '../../project-node-tree';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-manage-archives-add-development',
  templateUrl: './development.component.html',
})
export class ProjectManageArchivesAddDevelopmentComponent implements OnInit {
  

  constructor(
    private baseArchivesMilestoneService:BaseArchivesMilestoneService,
    private nzNotificationService: NzNotificationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getTreeList();
  }
  

  projectManageArchives:ProjectManageArchives={};//项目档案主表实体
  listOfMapData:any=[];//树形集合
  personnelList=[];//人员下拉列表
  remittanceInformation:any={};//回款信息实体
  expandKeys=[];//树形下拉默认展开第一级


  /**
   * 获取树形集合
   */
  getTreeList() {
    // let baseArchivesMilestone=new BaseArchivesMilestone();
    // baseArchivesMilestone.pkOrg=sessionStorage.getItem("pkOrg");//组织
    // baseArchivesMilestone.typeId="3";
    // this.baseArchivesMilestoneService.getTreeList(baseArchivesMilestone).then((response)=>{
    //   if(response.result){
    //     this.listOfMapData=response.result
    //     this.getLoding();
    //   }
    // })
  }

  /**
   * 初始化树形
   */
  getLoding(){
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  /**
   * 新增父级
   */
  //uuid
  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  guid() {
    return (this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
  };
  // 随机数
  add() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  adding() {
    return (this.add() + this.add() + this.add() + this.add() + this.add() + this.add() + this.add() + this.add());
  };
  addParent(){
    this.listOfMapData.forEach(item => {
      console.log(this.mapOfExpandedData[item.key]);
    });
    this.listOfMapData=[
      ...this.listOfMapData,
      {key:this.adding()}
    ]
    // this.getLoding();
    this.initialValue();
  }

  /**
   * 新增子集
   * @param parentId 父级id
   * @param data 操作对象
   */
  addChild(parentId){
    this.getChild(this.listOfMapData, parentId);
    this.initialValue();
  }

  /**
   * 递归查询子集增加
   */
  getChild(children, parentId) {
    var keyId = this.adding();
    children.forEach(element => {
      // 是否和点击的数据相等
      // 相等则在此条数据加子数据
      if (element.key == parentId) {
        // 是否存在自数据不存在则创建child
        if (element.children == null) {
          element.children = []
        }
        // 添加一条空的子数据到child
        element.children = [
          ...element.children,
          { key: keyId, parentId: parentId}
        ]
        // this.mapOfExpandedData[element.key] = this.convertTreeToList(null);
        // this.initialValue();
      } else {
        if (element.children != null) {
          this.getChild(element.children, parentId);
        }
      }
    });
  }

 /**
   * 删除行
   */
  deleteRow(array: ProjectNodeTree[], data: ProjectNodeTree, key){
    this.getdeleteRow(key, this.listOfMapData);
    this.initialValue()
  }

  /**
   * 递归删除
   * @param itemsId 对象id
   * @param list 需要删除对象的集合
   * @param parent 父级对象
   */
  getdeleteRow(itemsId: string, list?: any,parent?:any) {
    list.forEach((element, i) => {
      //判断选中得数据是否有找到
      if (element.key == itemsId) {
        //找到则先判断对象是否有子集，有则删除
        if (element.children != null && element.children.length > 0) {
          element.children.splice(0, element.children.length);
        }
        //然后删除父极对象
        list.splice(i, 1);
        //判断父极是否存在子集
        if (list.length == 0&&parent) {
          parent.children = null;
        }
        this.listOfMapData=[
          ...this.listOfMapData
        ]
        // this.getDataInitialization2();
        // this.initialValue();
      } else {
        //没有则判断是否有子集 有则递归同样判断
        if (element.children != null && element.children.length > 0) {
          this.getdeleteRow(itemsId, element.children,element);
        }
      }
    });
  }



  initialValue(){
    this.listOfMapData.forEach(item => {
      const data = this.mapOfExpandedData[item.key];
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
      const mapData = this.mapOfExpandedData[item.key];
      if (data && mapData) {
        mapData.forEach(el => {
          data.forEach(element => {
            if (element.key === el.key) {
              el.code=element.code;
              el.name=element.name;
              el.muilesId = element.muilesId;
              el.muilesName = element.muilesName;
              el.startDate = element.startDate;
              el.endDate = element.endDate;
              el.planTime = element.planTime;
              el.executors = element.executors;
              el.realTime = element.realTime;
            }
          })
        })
      }
    });
  }

  /**
   * 时间选择事件
   * 验证开始时间和结束时间是否在父级时间的范围内
   */
  startChange(item, date) {
    if (item.parent) {
      let parent = item.parent; //父级对象
      if (parent.startDate && parent.endDate) {
        let startDatePar = new Date(this.datePipe.transform(parent.startDate, 'yyyy-MM-dd')); //父级开始时间
        let endDatePar = new Date(this.datePipe.transform(parent.endDate, 'yyyy-MM-dd')); //父级结束时间
        let d = new Date(this.datePipe.transform(date, 'yyyy-MM-dd')); //选择的时间
        let isb = false;
        if (d.getTime() < startDatePar.getTime()) {
          //不能小于父级开始时间
          this.nzNotificationService.warning('不能小于父级开始时间', '');
          isb = true;
        }
        if (d.getTime() > endDatePar.getTime()) {
          //不能大于父级结束时间
          this.nzNotificationService.warning('不能大于父级结束时间', '');
          isb = true;
        }
        //如果验证到错误则清空时间
        if (isb) {
          //如果是操作的开始时间则清除开始时间
          if (d.getTime() === new Date(this.datePipe.transform(item.startDate, 'yyyy-MM-dd')).getTime()) {
            item.startDate = null;
          }
          //如果是操作的结束时间则清除结束时间
          if (d.getTime() === new Date(this.datePipe.transform(item.endDate, 'yyyy-MM-dd')).getTime()) {
            item.endDate = null;
          }
          this.initialValue();
        }
      }
    }
  }

  /**
   * 计划人天鼠标离开事件
   * 验证子级计划人天不得大于父级计划人天
   */
  planTimeKeyup(item) {
    if (item.parent) {
      let parent = item.parent; //父级对象
      //判断父级计划人天是否为空
      if (parent.planTime) {
        let planTimePar = Number(parent.planTime); //父级计划人天
        //循环父级的所有子集数据
        let planTimeChildTotal = 0; //所有子集计划人天
        //循环父级节点下的子级
        this.mapOfExpandedData[item.parent.key].forEach(child => {
          //判断是否父级下的子级 排除子子级
          if(child.level===parent.level+1){
            planTimeChildTotal = planTimeChildTotal + Number(child.planTime);
          }
        });
        //判断是否大于父级的计划人天
        if (planTimeChildTotal > planTimePar) {
          //子级计划人天总和不能大于父级计划人天
          this.nzNotificationService.warning('子级计划人天总和不能大于父级计划人天', '');
          item.planTime = 0;
        }
      }
    }
  }

  ///////////////////////////树形配置
  mapOfExpandedData: { [key: string]: ProjectNodeTree[] } = {};

  collapse(array: ProjectNodeTree[], data: ProjectNodeTree, $event: boolean): void {
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

  convertTreeToList(root: ProjectNodeTree): ProjectNodeTree[] {
    const stack: ProjectNodeTree[] = [];
    const array: ProjectNodeTree[] = [];
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

  visitNode(node: ProjectNodeTree, hashMap: { [key: string]: boolean }, array: ProjectNodeTree[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
}
