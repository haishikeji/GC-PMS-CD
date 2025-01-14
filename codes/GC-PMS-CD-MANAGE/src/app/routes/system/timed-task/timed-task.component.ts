import { I18NService } from './../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { TimedTaskService } from 'app/services/timed-task.service';
import { TimedTask } from 'app/entity/timed-task';
import { SystemTimedTaskAddComponent } from './add/add.component';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-system-timed-task',
  templateUrl: './timed-task.component.html',
})

/**
 * @fileoverview 定时任务列表页面渲染
 * 依赖定时任务实体类，编号模式网络服务类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SystemTimedTaskComponent implements OnInit {

  listOfData = [];//任务列表
  page = {
    total: 0,
    current: 0
  };


  timedTask: TimedTask;//查询条件
  isSpinning = false;

  constructor(
    private timedTaskService: TimedTaskService,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private i18NService: I18NService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.timedTask = {//初始化查询条件
      jobClassName: "",
      cronExpression: "",
      parameter: "",
      description: "",
      pageNo: 0
    }
    this.list(1);
  }



  // 获取分页编号模式列表
  list(pageNo) {
    this.isSpinning = true;
    this.timedTask.pageNo = pageNo;//当前页码
    this.timedTask.pkOrg=sessionStorage.getItem("pkOrg");
    this.timedTaskService.list(this.timedTask).then((response) => {
      this.listOfData = response.result.records;
      this.page = response.result;
      this.isSpinning = false;
    })
  }


  // 翻页事件
  pageIndexChange(event) {
    this.list(event);
  }

  //添加
  add() {
    const drawerRef = this.drawerService.create<SystemTimedTaskAddComponent, { value: string }, string>({
      nzTitle: this.i18NService.fanyi('TimedTask.Pages.Add.title'),
      nzWidth: "600px",
      nzContent: SystemTimedTaskAddComponent
    });
    //关闭的回调函数
    drawerRef.afterClose.subscribe(() => {
      this.list(this.page.current);
    });
  }

  //修改
  edit(id) {
    this.timedTaskService.queryById(id).then((respon) => {
      if (respon.success) {//判断是否返回数据
        console.log(respon);
        const drawerRef = this.drawerService.create<SystemTimedTaskAddComponent, { timedTask: TimedTask }, string>({
          nzTitle: this.i18NService.fanyi('TimedTask.Pages.Edit.title'),
          nzWidth: "600px",
          nzContent: SystemTimedTaskAddComponent,
          nzContentParams: {
            //params
            timedTask: respon.result
          }
        });

        //关闭的回调函数
        drawerRef.afterClose.subscribe((isload) => {
          if (isload) {
            //刷新表中的数据
            this.list(this.page.current);
          }
        });
      }
    });
  }

  //删除
  delete(id) {
    this.timedTaskService.delete(id).then((response) => {
      if (response.success) {
        this.notification.success(this.i18NService.fanyi("successful.deletion"), "");
        this.list(this.page.current);
      } else {
        this.notification.success(this.i18NService.fanyi("delete.failed"), response.message);
      }
    })

  }
  cancelDel() {

  }

}
