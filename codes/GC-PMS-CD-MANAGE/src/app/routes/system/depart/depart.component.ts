import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDropdownService, NzDropdownContextComponent, NzTreeNode, NzDrawerService, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DepartService } from 'app/services/depart.service';
import { Depart } from 'app/entity/depart';
import { SystemDepartAddComponent } from './add/add.component';
import { SystemDepartPersonnelAddComponent } from './personnel-add/personnel-add.component';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { Page } from 'app/entity/page';
import { I18NService } from '@core';
import { SystemDepartDetailsComponent } from './details/details.component';
import { EventManager } from '@angular/platform-browser';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-system-depart',
  templateUrl: './depart.component.html',
  styles: [
    `
    .custom-node {
      cursor: pointer;
      line-height: 24px;
      margin-left: 4px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }
    `
  ]
})
export class SystemDepartComponent implements OnInit {

  nodes: any;//部门tree数据
  depart: Depart;//部门对象
  personnl: any;//人员对象
  searchValue = "";//搜索框的值
  departId = "";//部门id
  listOfData = [];//人员数据
  page = {
    total: 0,
    current: 0
  }
  isSpinning = false;

  dropdown: NzDropdownContextComponent;
  constructor(
    private departService: DepartService,
    private nzDropdownService: NzDropdownService,
    private drawerService: NzDrawerService,
    private message: NzMessageService,
    private personnelService: PersonnelService,
    private notification: NzNotificationService,
    private i18NService: I18NService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.getAllTreeDepart()
    this.depart = {//初始化部门对象
      id: "",
      parentId: "",
      departName: "",
      departOrder: 0,
      mobile: "",
      address: "",
      memo: "",
      fax: "",
      pkPersonnel: ""
    }
    this.personnl = {
      code: "",
      name: "",
      pkDepart: "",
      pageNo:0
    }
    this.getListPersonnl();
  }

  //查询树节点数据
  getAllTreeDepart() {
    let depart=new Depart();
    // depart.pkOrg=sessionStorage.getItem("pkOrg");
    this.departService.getAllDepart1(depart).then((response) => {
      this.nodes = response.result
    })
  }

  //查询按钮
  query(){
    this.personnl.pageNo=1;
    this.getListPersonnl();
  }

  //查询全部人员
  getListPersonnl() {
    this.isSpinning = true;
    this.personnelService.findPagelist1(this.personnl).then((reponse) => {
      this.listOfData = reponse.result.records;
      this.page = reponse.result
      this.isSpinning = false;
    })
  }

  //重置
  rest() {
    this.personnl = {}
  }

  //按页码查询
  pageIndexChange(event) {
    // var page = new Page();
    // page.pageNo = event;//当前页
    // this.personnelService.getAllPersonnel(page).then((reponse) => {
    //   this.listOfData = reponse.result.records;
    //   this.page = reponse.result
    // })
    this.personnl.pageNo=event;
    this.getListPersonnl()
  }

  //树节点点击事件
  treeClick(event) {
    var getdDepart = event.node.origin;//当前点击的部门对象
    console.log(getdDepart.parentId)
    if (getdDepart.parentId != "" && getdDepart.parentId != null) {
      this.personnl.pkDepart = getdDepart.id;
    } else {
      this.personnl = {}
      this.personnl.pkOrg=getdDepart.id;//公司
    }
    this.getListPersonnl()

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
  contextMenu(Fid, $event: MouseEvent, template: TemplateRef<void>): void {
    this.departId = Fid;
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  //右键添加子部门（添加一级部门)/修改
  addDepar(isOne: number) {
    //title
    var title = "";
    if (isOne == 0) {
      //新增一级部门
      this.departId = "";
      title = document.getElementById('departTitleAdd').textContent;
    } else if (isOne == 1) {
      //新增子部门
      title = document.getElementById('departTitleAdd').textContent;
    } else {
      //修改部门
      title = document.getElementById('departTitleUpdate').textContent;
    }

    //打开抽屉
    const drawerAddDepar = this.drawerService.create<SystemDepartAddComponent, { isOne: number, departId: string }, string>({
      nzTitle: title,
      nzWidth: "10",
      nzContent: SystemDepartAddComponent,
      nzContentParams: {
        isOne: isOne,
        departId: this.departId,//部门id
      }
    })
    //回调 添加完关闭抽屉
    drawerAddDepar.afterClose.subscribe((clo) => {
      if (clo) {//判断是否刷新树列表数据
        this.getAllTreeDepart();
        this.getListPersonnl();
      }

    })
    this.dropdown.close()
  }

  //右键删除
  deleteDepart() {
    this.departService.deleteDepart(this.departId).then((response) => {
      if (response.success) {
        this.message.success(this.i18NService.fanyi("successful.deletion"));
        this.getAllTreeDepart();
        this.getListPersonnl();
      } else {
        this.message.error(this.i18NService.fanyi("delete.failed"));
      }
    });
    this.dropdown.close();
  }

  //右键取消
  cancel() {
    this.dropdown.close()
  }


  //重置
  reset() {
    this.depart = {}
  }

  //人员新增/修改
  editPersonnel(id) {

    //抽屉title
    var title = "";
    if (id == "") {
      title = document.getElementById('titleAdd').textContent;
    } else {
      title = document.getElementById('titleUpdate').textContent;
    }

    //打开抽屉
    const drawerAddDepar = this.drawerService.create<SystemDepartPersonnelAddComponent, { id: string }, string>({
      nzTitle: title,
      nzWidth: 800,
      nzContent: SystemDepartPersonnelAddComponent,
      nzContentParams: {
        id: id
      }
    })
    //回调 添加完关闭抽屉
    drawerAddDepar.afterClose.subscribe((clo) => {
      if (clo) {//判断是否刷新树列表数据
        this.getListPersonnl();
      }

    })
  }

  /**
   * @description: 详情
   * @param {type}
   * @author: 段亚鑫
   */
  openDetailsComponent(id) {
    this.drawerService.create({
      nzTitle: this.i18NService.fanyi("check.person"),
      nzWidth: 550,
      nzContent: SystemDepartDetailsComponent,
      nzContentParams: {
        id: id
      }
    })
  }

  //人员删除
  deletePersonnel(id: string) {
    this.personnelService.deletePersonnel(id).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("successful.deletion"), "")
        this.getListPersonnl();
      } else {
        this.notification.error(this.i18NService.fanyi("delete.failed"), messageShared(this.i18NService,response.message))
      }
    })
  }
}
