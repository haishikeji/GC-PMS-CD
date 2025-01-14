import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { ContractManagementContractFileAddComponent } from './add/add.component';
import { I18NService } from '@core';
import { ContractFile } from 'app/entity/contract-management/contract-file';
import { ContractFileService } from 'app/services/contract-management/contract-file.service';
import { ContractManagementContractFileUpdateComponent } from './update/update.component';
import { Router } from '@angular/router';
import { ContractProcessViewProcessViewComponent } from '../contract-process-view/process-view/process-view.component';

@Component({
  selector: 'app-contract-management-contract-file',
  templateUrl: './contract-file.component.html',
})
export class ContractManagementContractFileComponent implements OnInit {
  constructor(
    private nzDrawerService: NzDrawerService,
    private i18NService: I18NService,
    private contractFileService: ContractFileService,
    private nzNotificationService: NzNotificationService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getList();
  }

  contractFile: ContractFile = {}; //合同对象
  listOfData: ContractFile[] = []; //合同对象
  page = {
    total: 0,
    current: 0,
  }; //页码
  isSpinning = false;

  /**
   * 查询按钮
   */
  query() {
    this.contractFile.pageNo = 1;
    this.getList();
  }

  //按页码显示数据
  pageIndexChange(event) {
    this.contractFile.pageNo = event; //当前页码
    this.getList();
  }

  /**
   * 查询
   */
  getList() {
    return new Promise(resolve => {
      this.isSpinning = true;
      this.contractFile.pkOrg = sessionStorage.getItem('pkOrg'); //组织
      this.contractFileService.getPageList(this.contractFile).then(response => {
        if (response.success) {
          this.listOfData = JSON.parse(JSON.stringify(response.result.records));
          this.page = JSON.parse(JSON.stringify(response.result));
          this.isSpinning = false;
          resolve();
        }
      });
    });
  }

  /**
   * 详情
   */
  view(id) {
    const drawerRef = this.nzDrawerService.create({
      nzTitle: this.i18NService.fanyi('table.view'), //详情标题
      nzContent: ContractProcessViewProcessViewComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //合同id
        id: id,
      },
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe(isRefresh => {
      if (isRefresh) {
        //刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 修改
   */
  update(id) {
    const drawerRef = this.nzDrawerService.create({
      nzTitle: this.i18NService.fanyi('table.update'), //修改标题
      nzContent: ContractManagementContractFileUpdateComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzContentParams: {
        //合同id
        id: id,
      },
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe(isRefresh => {
      if (isRefresh) {
        //刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 删除
   */
  delete(id) {
    return new Promise(resolve => {
      this.contractFileService.deleteMainAndChild(id).then(response => {
        if (response.success) {
          //删除成功
          this.nzNotificationService.success(this.i18NService.fanyi('successful.deletion'), '');
          this.getList();
        } else {
          //删除失败
          this.nzNotificationService.error(this.i18NService.fanyi('delete.failed'), '');
        }
      });
    });
  }

  add() {
    const drawerRef = this.nzDrawerService.create({
      nzTitle: this.i18NService.fanyi('button.add'), //新增标题
      nzContent: ContractManagementContractFileAddComponent,
      nzWidth: window.innerWidth,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      // nzContentParams: {
      //   //模板id
      //   quotationId: item.id
      // }
    });

    //关闭抽屉的回调
    drawerRef.afterClose.subscribe(isRefresh => {
      if (isRefresh) {
        //刷新list列表
        this.getList();
      }
    });
  }

  /**
   * 提交流程
   */
  submitProcess(id) {
    return new Promise(resolve => {
      this.isSpinning=true;
      this.contractFileService.submitProcess(id).then(response => {
        if (response.success) {
          //提交成功
          this.nzNotificationService.success("提交成功", '');
          this.getList();
          this.isSpinning=false;
          resolve()
        } else {
          //提交失败
          this.nzNotificationService.error("提交失败", '');
          this.isSpinning=false;
        }
      });
    });
  }

  add2(){
    // this.router.navigateByUrl("/contract-management/contract-process-view")
    this.router.navigateByUrl("/contract-process-view")
    // window.open("http://localhost:4200/#/contract-management/contract-file")

  }
}
