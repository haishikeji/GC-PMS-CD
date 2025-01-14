import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {
  NzDrawerService,
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzMessageService,
  NzModalService,
  NzTreeNode,
} from 'ng-zorro-antd';
import { BasedataMaterialFileAddComponent } from './add/add.component';
import { Page } from 'app/entity/page'; //分页
import { BaseMaterialFileClassification } from 'app/entity/basedata/base-material-file-classification';
import { BaseMaterialFileClassificationService } from 'app/services/basedata/base-material-file-classification.service';
import { BaseMaterialFileProductService } from 'app/services/basedata/base-material-file-product.service';
import { SFSchema } from '@delon/form';
import { messageShared } from '@shared/utils/message';
import { I18NService } from '@core';
import { BasedataMaterialFileProductAddComponent } from './product-add/product-add.component';
import { BaseMaterialFileProduct } from 'app/entity/basedata/base-material-file-product';
import { BasedataMaterialFileDetailsComponent } from './details/details.component';

@Component({
  selector: 'app-basedata-material-file',
  templateUrl: './material-file.component.html',
})
export class BasedataMaterialFileComponent implements OnInit {
  baseMaterialFileClassification: BaseMaterialFileClassification = {}; //  物料档案分类 对象
  baseMaterialFileProduct: BaseMaterialFileProduct = {}; //物料产品 对象
  activedNode: NzTreeNode;
  dropdown: NzDropdownContextComponent;
  isSpinning = false;

  searchValue = ''; //搜索框值
  materialNodes: any; //物料分类 数据
  materialId = ''; //物料分类 id

  //分页对象
  page = {
    total: 0,
    current: 0,
  };

  proTable = []; //产品数据
  clickProId = ''; //点击产品id

  constructor(
    private drawerService: NzDrawerService,
    private baseMaterialFileClassificationService: BaseMaterialFileClassificationService,
    private baseMaterialFileProductService: BaseMaterialFileProductService,
    private message: NzMessageService,
    private i18NService: I18NService,
    private modalService: NzModalService,
    private nzDropdownService: NzDropdownService,
  ) {}

  ngOnInit() {
    this.getMaterialTree(); //物料分类树
    this.getProductList(); // 产品数据
  }

  //查询 物料分类 树
  getMaterialTree() {
    return new Promise(resolve => {
      let baseMaterialFileClassification = new BaseMaterialFileClassification();
      baseMaterialFileClassification.pkOrg = sessionStorage.getItem('pkOrg'); //组织
      this.baseMaterialFileClassificationService.getTreeList(baseMaterialFileClassification).then(res => {
        this.materialNodes = res.result;
        console.log('物料分类 树', this.materialNodes);
        resolve();
      });
    });
  }

  //查询产品 列表
  getProductList() {
    this.isSpinning = true;
    return new Promise(resolve => {
      this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
      // 根据页面绑定的查询条件进行查询
      this.baseMaterialFileProductService.list(this.baseMaterialFileProduct).then(res => {
        this.page = res.result;
        this.proTable = res.result.records;
        this.isSpinning = false;
        console.log('产品列表(无模块)', this.proTable);
        resolve();
      });
    });
  }

  //右边查询按钮
  query() {
    this.baseMaterialFileProduct.pageNo = 1;
    this.getProductList(); //所有产品
  }

  //物料分类 新增、修改 （对话框）
  addMaterial(isOne: number) {
    var title = '';
    if (isOne == 0) {
      //新增一级
      this.materialId = '';
      title = document.getElementById('titleAdd').textContent;
    } else if (isOne == 1) {
      //新增 某分级 下的产品
      title = document.getElementById('titleAdd').textContent;
    } else {
      //修改
      title = document.getElementById('titleUpdate').textContent;
    }
    // --------------------------------------------------------------
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: BasedataMaterialFileAddComponent,
      nzWidth: 800,
      nzComponentParams: {
        isOne: isOne, //判断修改 or 新增
        materialId: this.materialId, //物料分类id
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
          onClick: addModel => {
            addModel.submitForm().then(res => {
              this.getMaterialTree();
              this.getProductList();
            });
          },
        },
      ],
    });
  }
  //产品 新增、修改 (抽屉)
  addProduct(id) {
    var title = '';
    //判断是抽屉标题是 新增 还是 修改
    if (id) {
      //修改
      title = document.getElementById('proTitUpdate').textContent;
    } else {
      //新增
      title = document.getElementById('proTitAdd').textContent;
    }
    // =============================================================
    const drawerAddPro = this.drawerService.create<
      BasedataMaterialFileProductAddComponent,
      { id: string; materialId: string },
      string
    >({
      nzTitle: title,
      nzWidth: 800,
      nzContent: BasedataMaterialFileProductAddComponent,
      nzContentParams: {
        id: id, //页面点击的产品ID 传参给抽屉
        materialId: this.materialId, //物料分类id （给抽屉的回显树）
      },
    });
    //抽屉关闭 时回调
    drawerAddPro.afterClose.subscribe(clo => {
      //不成功时 清空 物料分类ID
      this.materialId = '';
      if (clo) {
        //成功
        //判断是否刷新树列表数据
        this.getMaterialTree();
        this.getProductList();
      }
    });
    // ============================================================
  }
  //树节点点击事件
  treeClick(data) {
    // 此方法查询产品后，需要点击重置才能刷新到所有产品列表
    console.log('点击节点id', data.node.key);
    this.baseMaterialFileProduct.baseMaterialFileClassificationId = data.node.key;
    this.getProductList(); // 查询对应产品数据
  }

  //按页码查询
  pageIndexChange(event) {
    // console.log('当前页码', event);
    this.baseMaterialFileProduct.pageNo = event;
    this.getProductList();
  }

  //重置
  rest() {
    this.baseMaterialFileProduct = {}; //清空 查询条件
  }

  //双击节点自动打开树分支
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    console.log(data);
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
      console.log('00', data);
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  //右键树节点
  contextMenu(Fid, event: MouseEvent, template: TemplateRef<void>): void {
    this.materialId = Fid;
    // console.log('点击项 ID', this.materialId);
    this.dropdown = this.nzDropdownService.create(event, template);
  }
  //右击删除
  delMaterial() {
    this.baseMaterialFileClassificationService.delete(this.materialId).then(response => {
      if (response.success) {
        this.message.success(this.i18NService.fanyi('successful.deletion'));
        this.getMaterialTree();
        this.getProductList();
        this.dropdown.close();
        //弹框消失
      } else {
        this.message.error(this.i18NService.fanyi('delete.failed'));
      }
    });
  }

  //产品详情
  detailProduct(id) {
    this.drawerService.create({
      nzTitle: this.i18NService.fanyi('product.details'),
      nzWidth: 800,
      nzContent: BasedataMaterialFileDetailsComponent,
      nzContentParams: {
        id: id,
      },
    });
  }
  //删除产品
  delPro(id) {
    this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg'); //组织
    this.baseMaterialFileProductService.deleteMainAndChild(id).then(res => {
      console.log(res);
      this.getProductList();
    });
  }
  //右键取消
  cancel() {
    this.dropdown.close();
    this.baseMaterialFileProduct = {}; //清空
  }
}
