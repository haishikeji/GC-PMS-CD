import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd';
import { BaseMaterialFileProduct } from 'app/entity/basedata/base-material-file-product';
import { BaseMaterialFileProductService } from 'app/services/basedata/base-material-file-product.service';

@Component({
  selector: 'app-basedata-material-file-details',
  templateUrl: './details.component.html',
  styles: [
    `
      .footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 10px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
      }
    `,
  ],
})
export class BasedataMaterialFileDetailsComponent implements OnInit {
  constructor(private drawerRef: NzDrawerRef, private baseMaterialFileProductService: BaseMaterialFileProductService) {}

  ngOnInit() {
    this.getProById();
  }

  @Input() id; //点击抽屉的 ID
  modData: any = []; //模块表
  baseMaterialFileProduct: BaseMaterialFileProduct = {}; //产品对象
  status = false; //是否启用
  isLoading = true;

  //根据 id  查询主子表数据
  getProById() {
    return new Promise(resolve => {
      this.baseMaterialFileProduct.pkOrg = sessionStorage.getItem('pkOrg');
      this.baseMaterialFileProductService.queryMainAndChildById(this.id).then(res => {
        this.baseMaterialFileProduct = res.result;
        // console.log('产品对象集合', this.baseMaterialFileProduct);
        if (res.result.baseMaterialFileModularList) {
        this.modData = res.result.baseMaterialFileModularList;
        console.log('模块', this.modData);
          this.modData.forEach(e => {
            // console.log('2222', e);
          });
        }
        this.isLoading = false;
        resolve();
      });
    });
  }
  close() {
    this.drawerRef.close();
  }
}
