import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from 'app/entity/page';
import { PersonnelService } from 'app/services/basedata/personnel.service';
import { SysAnnouncement } from 'app/entity/sys-announcement';
import { SysAnnouncementSend } from 'app/entity/sys-announcement-send';
import { AnnountCementService } from 'app/services/sys-announcement.service';
import { I18NService } from '@core';
import { messageShared } from '@shared/utils/message';

@Component({
  selector: 'app-routes-message-notification',
  templateUrl: './message-notification.component.html',
})
export class RoutesMessageNotificationComponent implements OnInit {

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private personnelService: PersonnelService,
    private annountCementService:AnnountCementService,
    private notificationService: NzNotificationService,
    private i18NService: I18NService
  ) { }

  validateForm: FormGroup;

  ngOnInit(): void {
    this.getValidateForm();
    this.getCustomerCodeData();
  }

  /**
   * 初始化表单
   */
  getValidateForm() {
    this.validateForm = this.fb.group({
      titile: [null, [Validators.required]],
      msgContent: [null, [Validators.required]],
      receiver: [null, [Validators.required]]
    });
  }

  personnelData = [];
  // 查询人员编码
  getCustomerCodeData() {
    const page = new Page();
    page.pageSize = 500;
    this.personnelService.queryApprover(null).then((response) => {
      this.personnelData = response.result;
    })
  }

  //消息对象
  sysAnnouncement: SysAnnouncement = {};
  //接收人集合
  receiver: any[] = [];


  submitForm() {
    return new Promise((resolve) => {
      console.log(this.validateForm.valid)
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      
      if (this.validateForm.valid) {
        //获取接收人集合
        this.getSysAnnouncementSend(this.sysAnnouncement);
        this.annountCementService.addAll(this.sysAnnouncement).then((response)=>{
          if(response.success){
            //发送成功
            this.notificationService.success(this.i18NService.fanyi("Send.successfully"),"");
            resolve();
          }else{
            //发送失败
            this.notificationService.error(this.i18NService.fanyi("fail.in.send"),messageShared(this.i18NService,response.message));
          }
        })
      }
    })
  }

  /**
   * 获取接收人集合到消息对象
   * @param sysAnnouncement 消息对象
   */
  getSysAnnouncementSend(sysAnnouncement: SysAnnouncement) {
    if (this.receiver && this.receiver.length > 0) {
      let sysAnnouncementSendData = new Array();//接收人集合
      //循环选中接收人
      this.receiver.forEach(rece => {
        let sysAnnouncementSend = new SysAnnouncementSend();
        sysAnnouncementSend.userId = rece;
        //循环下拉数据获取选中的人员名称
        this.personnelData.forEach(company => {
          company.children.forEach(depart => {
            depart.children.forEach(personnel => {
              if (rece === personnel.id) {
                sysAnnouncementSend.userName = personnel.name;
              }
            });
          });
        });
        //接收人对象添加到集合中
        sysAnnouncementSendData.push(sysAnnouncementSend);
      });
      //接收人集合添加到消息对象
      sysAnnouncement.sysAnnouncementSendList = sysAnnouncementSendData;
    }
  }

  close() {
    this.modal.destroy();
  }
}
