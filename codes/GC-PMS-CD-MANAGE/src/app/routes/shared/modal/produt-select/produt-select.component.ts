import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  NzModalRef,
  NzMessageService,
  NzTreeNode,
  NzFormatEmitEvent,
  NzDropdownContextComponent,
  NzDropdownService,
  NzNotificationService,
} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseMaterialFileClassificationService } from 'app/services/basedata/base-material-file-classification.service';
import { BaseMaterialFileClassification } from 'app/entity/basedata/base-material-file-classification';
import { BaseMaterialFileProduct } from 'app/entity/basedata/base-material-file-product';
import { BaseMaterialFileProductService } from 'app/services/basedata/base-material-file-product.service';

@Component({
  selector: 'app-routes-shared-modal-produt-select',
  templateUrl: './produt-select.component.html',
})
/**
 * 产品选择公用弹框
 */
export class RoutesSharedModalProdutSelectComponent implements OnInit {
  constructor(
    private nzDropdownService: NzDropdownService,
    private baseMaterialFileClassificationService: BaseMaterialFileClassificationService,
    private baseMaterialFileProductService: BaseMaterialFileProductService,
    private modal: NzModalRef,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getListContractTree();
  }

  searchValue = ''; //搜索框的值
  nodes: any = []; //tree集合
  dropdown: NzDropdownContextComponent;
  listOfData: BaseMaterialFileProduct[] = []; //产品集合
  isSpinning = false; //加载状态
  page = {
    total: 0,
    current: 0,
  }; //页码
  baseMaterialFileProduct: BaseMaterialFileProduct = {}; //产品查询对象

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

  //查询tree合同类型
  getListContractTree() {
    return new Promise(resolve => {
      let baseMaterialFileClassification = new BaseMaterialFileClassification();
      baseMaterialFileClassification.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseMaterialFileClassificationService.getTreeList(baseMaterialFileClassification).then(response => {
        this.nodes = JSON.parse(JSON.stringify(response.result));
        resolve();
      });
    });
  }

  //树节点点击事件
  treeClick(event) {
    var getdDepart = event.node.origin; //当前点击的对象
    this.baseMaterialFileProduct.baseMaterialFileClassificationId = getdDepart.key; //获取分类id
    //根据分类id查询产品数据
    this.getProdutPage();
  }

  /**
   * 产品分页查询
   */
  getProdutPage() {
    return new Promise(resolve => {
      this.isSpinning = true;
      this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseMaterialFileProductService.list(this.baseMaterialFileProduct).then(response => {
        this.listOfData = response.result.records;
        this.isSpinning = false;
        resolve();
      });
    });
  }

  //按页码显示数据
  pageIndexChange(event) {
    // this.customer.pageNo = event; //当前页码
    // this.getList();
  }

  selectObj: any = []; //最终勾选的产品
  save() {
    return new Promise(resolve => {
      this.selectObj = []; //清空上一次勾选的数据
      this.listOfDisplayData.forEach(element => {
        //判断 出 已勾选 true
        if (this.mapOfCheckedId[element.id]) {
          this.selectObj.push(element);
        }
      });
      if (this.selectObj.length == 0) {
        this.notification.warning('提示', '必须选择一个产品');
      } else if (this.selectObj.length > 1) {
        this.notification.warning('提示', '只能选择一个产品');
      } else if (this.selectObj.length == 1) {
        resolve()
        this.modal.close();
      }
    });
  }

  listOfDisplayData: any[] = []; //所有列表集合（包含勾选框）
  mapOfCheckedId: { [key: string]: boolean } = {}; //已勾选 and 层勾选的项
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    // this.refreshStatus();
  }

  close() {
    this.modal.close();
  }
}
