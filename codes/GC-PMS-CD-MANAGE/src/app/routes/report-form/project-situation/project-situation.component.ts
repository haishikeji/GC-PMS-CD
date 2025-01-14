import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ProjectStatisticsService } from 'app/services/report-form/project-statistics.service';

export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}
@Component({
  selector: 'app-report-form-project-situation',
  templateUrl: './project-situation.component.html',
})
export class ReportFormProjectSituationComponent implements OnInit {
  constructor(private projectStatisticsService: ProjectStatisticsService) {}

  ngOnInit() {
    
  }

  isSpinning=false;

  /**
   * 树形初始化
   */
  getTreeLoading() {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  /**
   * 获取树形数据
   */
  getProStatistics() {
    this.isSpinning=true;
    this.projectStatisticsService.getProStatistics(this.projectStatisticsWhere).then(response => {
      this.listOfMapData=response.result;
      this.getTreeLoading();
      this.isSpinning=false;
    });
  }

  projectStatisticsWhere:any={};
  /**
   * 查询按钮
   */
  query(){
    this.getProStatistics();
  }

  listOfMapData: TreeNodeInterface[] = [
  ];

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
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
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

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
