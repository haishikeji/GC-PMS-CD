import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { TimedTaskService } from 'app/services/timed-task.service';
import { TimedTask } from 'app/entity/timed-task';

@Component({
  selector: 'app-system-timed-task-add',
  templateUrl: './add.component.html',
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
    `
  ]
})
/**
 * @fileoverview 定时任务新增，修改页面渲染
 * 依赖定时任务实体类，定时任务网络服务类
 * @author 冯海夫
 * Copyright 2019 上海翠颠信息科技有限公司. All Rights Reserved.
 */
export class SystemTimedTaskAddComponent implements OnInit {
  @Input() timedTask: TimedTask;//定时任务对象(@input用于接收点击修改传来的对象)

  currentHours = [];
  currentMinutes = [];
  allHours = [];
  allMinutes = [];
  constructor(
    private nzDrawerRef: NzDrawerRef,
    private timedTaskService: TimedTaskService,//对接后台接口的service
    private i18NService:I18NService,
  ) { }

  status="";
  ngOnInit(): void {
    for (let i=0; i<24; i++)
      this.allHours.push({
        text:i+"",
        value:i+""
      });
    for (let i=0; i<60; i++)
      this.allMinutes.push({
        text:i+"",
        value:i+""
      });
      
    if (this.timedTask == null) {
      this.timedTask = {//添加定时任务初始化数据字典类
        id: "",
        delFlag: 0,
        jobClassName: "",
        cronExpression: "",
        parameter:"",
        description:"",
        status:0,
        createBy:"",
        createTime:"",
        updateBy:"",
        updateTime:""
      };
     } else {
        const expsList = this.timedTask.cronExpression.split(" ");
        console.log("===============1."+this.timedTask.cronExpression);
        console.log("---------------2."+expsList.length);
        this.currentMinutes = expsList[1].split(",");
        this.currentHours = expsList[2].split(",");
      }
    this.status = this.timedTask.status+"";
  }

  //保存
  save() {
    this.timedTask.status = parseInt(this.status);
    // this.timedTask.cronExpression = "0 "+this.currentMinutes+" "+this.currentHours+"  * * ?";
    //获取分钟
    let cronExpression1="";
    if(this.currentMinutes&&this.currentMinutes.length>0){
      this.currentMinutes.forEach(element => {
        cronExpression1+=element+",";
      });
    }
    //获取小时
    let cronExpression2="";
    if(this.currentHours&&this.currentHours.length>0){
      this.currentHours.forEach(element => {
        cronExpression2+=element+",";
      });
    }
    
    //去除分钟的“，”
    if(cronExpression1.length>0){
      console.log(cronExpression1)
      cronExpression1=cronExpression1.substring(0,cronExpression1.length-1);
      console.log(cronExpression1)
    }
    //去除小时的“，”
    if(cronExpression2.length>0){
      cronExpression2=cronExpression2.substring(0,cronExpression2.length-1);
    }
    this.timedTask.cronExpression = "0 "+cronExpression1+" "+cronExpression2+"  * * ?";

    if (this.timedTask.id === "" || this.timedTask.id === null) {
      this.timedTask.pkOrg=sessionStorage.getItem("pkOrg");
      //添加
      this.timedTaskService.add(this.timedTask).then((response) => {
        if (response.success === true) {
          this.nzDrawerRef.close(true);
          alert(this.i18NService.fanyi("insert.success"))
        } else {
          alert(this.i18NService.fanyi("insert.defeated"))
        }
      })
    }else{
      //修改
      this.timedTaskService.edit(this.timedTask).then((response) => {
        if (response.success === true) {
          this.nzDrawerRef.close(true);
          alert(this.i18NService.fanyi("successful.revision"))
        } else {
          alert(this.i18NService.fanyi("modification.failed"))
        }
      })
    }

  }

  //关闭抽屉
  close() {
    this.nzDrawerRef.close(false);
  }
}
