import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, ReuseTabService } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { StartupService } from '@core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ContractFileService } from 'app/services/contract-management/contract-file.service';
import { ContractProcessViewProcessViewEssentialInformationComponent } from './essential-information/essential-information.component';
import { ContractProcessViewProcessViewProductModuleComponent } from './product-module/product-module.component';
import { ContractProcessViewProcessViewCollectionPlanComponent } from './collection-plan/collection-plan.component';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-contract-process-view-process-view',
  templateUrl: './process-view.component.html',
  styles: [
    `
      .base {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 6px 16px;
        text-align: right;
        left: 0px;
        background: #fff;
        z-index: 99;
      }
    `,
  ],
})
export class ContractProcessViewProcessViewComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private router: Router,
    private activateInfo: ActivatedRoute,
    private contractFileService:ContractFileService,
    private drawerRef:NzDrawerRef
  ) {}

  //基本信息组件
  @ViewChild('essentialInformation')
  essentialInformation: ContractProcessViewProcessViewEssentialInformationComponent;
  //产品与模块组件
  @ViewChild('productModule')
  productModule: ContractProcessViewProcessViewProductModuleComponent;
  //收款计划
  @ViewChild('collectionPlan')
  collectionPlan: ContractProcessViewProcessViewCollectionPlanComponent;

  // md5 = require('js-md5');
  // error = '';
  // username = '';
  id = '';
  isLoadingSave = false;
  ngOnInit() {
    if (this.id) {
      this.getById();
    } else {
      this.activateInfo.queryParams.subscribe(queryParams => {
        this.id = queryParams.id;
      });
    }

    //获取OA流跳转地址获取参数
    // this.activateInfo.queryParams.subscribe(queryParams => {
    //   this.username = queryParams.username;
    //   this.id = queryParams.id;
    //   let url = 'sys/loginByUserName'; //'/login/account?_allow_anonymous=true'
    //   this.http
    //     .post(url, {
    //       type: 0,
    //       username: this.username,
    //     })
    //     .subscribe((res: any) => {
    //       //if (res.msg !== 'ok') {
    //       if (res.code !== 200) {
    //         this.error = res.message;
    //         return;
    //       }
    //       // 清空路由复用信息
    //       this.reuseTabService.clear();
    //       // 设置用户Token信息
    //       //this.tokenService.set(res.user);
    //       this.tokenService.set(res.result);
    //       sessionStorage.setItem('pkOrg', '');
    //       //console.log(res);
    //       // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
    //       this.startupSrv.load().then(() => {
    //       });
    //     });
    // });
  }

  /**
   * 根据id查询
   */
  getById() {
    return new Promise(resolve => {
      this.contractFileService.getContractFileById(this.id).then(response => {
        if (response.success) {
          let contractFile = JSON.parse(JSON.stringify(response.result));
          //合同基本信息
          this.essentialInformation.contractFile = contractFile;
          //产品数据
          if (contractFile.contractFileProductList) {
            this.productModule.productList = contractFile.contractFileProductList;
          }
          //收款计划数据
          if (contractFile.contractFileAndBusinessList) {
            let collectionPlanList = []; //收款计划
            let paymentCollectionList = []; //回款计划
            contractFile.contractFileAndBusinessList.forEach(element => {
              if (element.planType == '1') {
                collectionPlanList.push(element);
              }
              if (element.planType == '2') {
                paymentCollectionList.push(element);
              }
            });
            this.collectionPlan.collectionPlanList=collectionPlanList
            this.collectionPlan.paymentCollectionList=paymentCollectionList
          }
          resolve();
        }
      });
    });
  }

  /**
   * 自动登录
   */
  automaticLogon() {
    // return new Promise(resolve => {
    //   let url = 'sys/loginByUserName'; //'/login/account?_allow_anonymous=true'
    //   this.http
    //     .post(url, {
    //       type: 0,
    //       username: this.username,
    //     })
    //     .subscribe((res: any) => {
    //       //if (res.msg !== 'ok') {
    //       if (res.code !== 200) {
    //         this.error = res.message;
    //         return;
    //       }
    //       // 清空路由复用信息
    //       this.reuseTabService.clear();
    //       // 设置用户Token信息
    //       //this.tokenService.set(res.user);
    //       this.tokenService.set(res.result);
    //       sessionStorage.setItem('pkOrg', '');
    //       //console.log(res);
    //       // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
    //       this.startupSrv.load().then(() => {
    //         this.router.navigateByUrl('/dashboard/analysis');
    //         resolve();
    //       });
    //     });
    // });
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  close() {
    this.drawerRef.close();
  }
}
