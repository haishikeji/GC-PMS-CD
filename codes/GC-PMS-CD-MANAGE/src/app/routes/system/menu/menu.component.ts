import { SystemMenuEditComponent } from './edit/edit.component';
import { I18NService } from '@core';
// import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

import { NzMessageService, NzNotificationService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
// import { STColumn, STComponent } from '@delon/abc';
// import { SFSchema } from '@delon/form';
// import { NzIconService } from 'ng-zorro-antd';
// import { ICONS_AUTO } from 'style-icons-auto';

// @Component({
//   selector: 'app-system-menu',
//   templateUrl: './menu.component.html',
// })
// export class SystemMenuComponent implements OnInit {
//   url = `sys/permission/list`;
//   searchSchema: SFSchema = {
//     properties: {
//       no: {
//         type: 'string',
//         title: this.i18NService.fanyi("table.thead.code")
//       }
//     }
//   };
//   @ViewChild('st') st: STComponent;
//   columns: STColumn[] = [
//     // { title: this.i18NService.fanyi("table.thead.code"), index: 'no' },
//     { title: '图标',  type:'tag' ,index: 'icon',format: (item: any) => '<i class="anticon anticon-'+`${item.icon}`+'"></i>' },
//     { title: '菜单名称', index: 'name' },
//     { title: '菜单类型', index: 'menuType' ,format: (item: any) => `${item.menuType}==0`?"一级菜单":`${item.menuType}==1`?"二级菜单":"权限菜单"},
//     { title: '菜单权限', index: 'perms' },
//     { title: '路由地址', index: 'url' },
//     { title: '排序', index: 'sortNo' },
//     { title: '是否隐藏', index: 'hidden' ,format: (item: any) => `${item.hidden}`?"是":"否"},
//     {
//       title: '操作',
//       buttons: [
//         { text: '新增', click:(item: any) => this.add()},//(item: any) => `/form/${item.id}`
//         { text: '编辑', click:(item: any) => this.edit() },//component: FormEditComponent,
//         { text: '删除', click:(item: any) => this.delete() },
//       ]
//     }
//   ];

//   constructor(private http: _HttpClient, private modal: ModalHelper,private i18NService:I18NService) {
//     //iconSrv.addIcon(...ICONS_AUTO, ...ICONS);,private iconSrv: NzIconService
//   }

//   ngOnInit() { }

//   add() {
//     alert()
//     // this.modal
//     //   .createStatic(FormEditComponent, { i: { id: 0 } })
//     //   .subscribe(() => this.st.reload());
//   }
//   edit(){
//     alert(0)
//   }
//   delete(){
//     alert(0)
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/services/menu.service';
import { SystemMenuDataRolesComponent } from './data-roles/data-roles.component';
import { EventManager } from '@angular/platform-browser';
import { Menu } from 'app/entity/menu';

export interface TreeNodeInterface {
  key: string;
  name: string;
  menuType: string;
  icon: string;
  url: string;
  perms: string;
  expand: boolean;
  hidden: boolean;
  sortNo: number;
  children?: TreeNodeInterface[];
}

@Component({
  selector: 'nz-demo-table-expand-children',
  templateUrl: './menu.component.html'
})
export class SystemMenuComponent implements OnInit {
  listOfMapData = [];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  isSpinning = false;

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
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

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: any }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  constructor(private menuService: MenuService, private modal: ModalHelper, private notification: NzNotificationService,
    private nzModalService: NzModalService, private i18NService: I18NService,
    private nzDrawerService: NzDrawerService,private eventManager: EventManager) { }
  ngOnInit(): void {
    this.getMenus();
  }

  //获取用户菜单信息
  getMenus() {
    this.isSpinning = true;
    let menu=new Menu();
    // menu.pkOrg=sessionStorage.getItem("pkOrg");
    this.menuService.getMenus1(menu).then((response) => {
      this.listOfMapData = response.result;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
      });
      this.isSpinning = false;
    });
  }

  //删除菜单
  confirmDel(id: string) {
    this.menuService.delete(id).then((response) => {
      //console.log(response);
      if(response.success){
        this.notification.success(this.i18NService.fanyi("successful.deletion"), "");
        this.getMenus();
      }else{
        this.notification.success(this.i18NService.fanyi("delete.failed"), "");
      }
    });
  }

  cancelDel() {

  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.listOfMapData, event.previousIndex, event.currentIndex);
  }

  /**
   * 数据规则
   */
  dataRoles(menu) {
    //创建数据规则抽屉
    const drawerRef = this.nzDrawerService.create<SystemMenuDataRolesComponent, { menuId: string }>({
      //标题数据规则
      nzTitle: this.i18NService.fanyi("data.roles"),
      nzWidth: 800,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContent: SystemMenuDataRolesComponent,
      nzContentParams: {
        //菜单id
        menuId: menu.id
      }
    })
  }

}
