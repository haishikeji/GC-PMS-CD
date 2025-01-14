import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectManageArchives } from 'app/entity/project-manage-archives/project-manage-archives';
import { ProjectNodeTree } from '../../project-node-tree';

@Component({
  selector: 'app-project-manage-archives-view-implementation',
  templateUrl: './implementation.component.html',
})
export class ProjectManageArchivesViewImplementationComponent implements OnInit {
  

  constructor(
  ) { }

  ngOnInit(): void {
  }

  projectManageArchives: ProjectManageArchives = {}; //项目档案主表实体
  listOfMapData: any = []; //树形集合
  remittanceInformation: any = {}; //回款信息实体

  /**
   * 初始化树形
   */
  getLoding() {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
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
