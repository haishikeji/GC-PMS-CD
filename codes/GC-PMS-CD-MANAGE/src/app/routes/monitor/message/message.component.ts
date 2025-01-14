import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { I18NService } from '@core';
import { MonitorMessageDetailComponent } from './detail/detail.component';
import { AnnountCementSendService } from 'app/services/sys-announcement-send.service';
import { SysAnnouncementSend } from 'app/entity/sys-announcement-send';
import { SysAnnouncement } from 'app/entity/sys-announcement';

@Component({
  selector: 'app-monitor-message',
  templateUrl: './message.component.html',
})
export class MonitorMessageComponent implements OnInit {

  constructor(private http: _HttpClient, private nzModalService: NzModalService, private i18nService: I18NService
    , private annountCementSendService: AnnountCementSendService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  listOfMapData: any = [];
  page = {
    total: 0,
    current: 0
  };
  sysAnnouncement: SysAnnouncement = {};
  modal = null;
  isLoading = false;

  /**
   * 查询全部
   */
  getDataList() {
    this.isLoading = true;
    return new Promise((resolve) => {
      this.annountCementSendService.list(null).then((response) => {
        this.listOfMapData = response.result.records
        this.page = response.result;
        this.isLoading = false;
        resolve();
      })
    })
  }

  /**
   * 查询按钮
   */
  sysAnnouncementSend: SysAnnouncementSend = {};
  query() {
    this.sysAnnouncementSend.pageNo = 1;
    this.getDataList();
  }

  /**
   * 分页按钮事件
   * @param event 页码
   */
  pageIndexChange(event) {
    this.sysAnnouncementSend.pageNo = event;
    this.getDataList();
  }

  check(data, modal) {
    this.modal = this.nzModalService.create({
      nzTitle: this.i18nService.fanyi("check.message"),
      nzContent: MonitorMessageDetailComponent,
      nzWidth: 700,
      nzComponentParams: {
        data: data
      },
      nzFooter: modal
    });
    this.modal.afterClose.subscribe(result => {
      if (data.readFlag !== "1") {
        this.query();
      }
    })
  }

  close() {
    this.modal.destroy();
  }

}
