import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { Router } from '@angular/router';
import { AnnountCementSendService } from 'app/services/sys-announcement-send.service';
import { SysAnnouncementSend } from 'app/entity/sys-announcement-send';
import { I18NService } from '@core';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select()"
      (clear)="clear()"
      (popoverVisibleChange)="loadData()"
    ></notice-icon>
  `,
  styles: [
    `
      .notice-icon {
        display: none !important;
      }
    `,
  ],
})
export class HeaderNotifyComponent {
  data: NoticeItem[] = [
    {
      title: this.i18NService.fanyi('notice'), //通知
      list: [],
      emptyText: this.i18NService.fanyi('notice'),
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: this.i18NService.fanyi('empty'), //清空
    },
  ];
  count = 0;
  loading = false;

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private annountCementSendService: AnnountCementSendService,
    private i18NService: I18NService,
  ) {
    this.getCountTotal();
  }

  private updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime!, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type)!.list.push(newItem);
    });
    return data;
  }

  loadData() {
    this.getCountTotal().then(() => {
      // if (this.loading) return;
      // this.loading = true;
      // setTimeout(() => {
      this.data = this.updateNoticeData([]);
      // this.loading = false;
      // }, 1000);
    });
  }
  // 是否点击了按钮标识符
  backLog = false;
  message = false;
  inform = false;

  /**
   * 获取消息条数
   */
  getCountTotal() {
    return new Promise(resolve => {
      this.loading = true;
      let sysAnnouncementSend = new SysAnnouncementSend();
      sysAnnouncementSend.readFlag = '0';
      //查询未读的消息
      this.annountCementSendService.listNotJurisdiction(sysAnnouncementSend).then(response => {
        this.count = response.result.total;
        this.cdr.detectChanges();
        this.loading = false;
        resolve();
      });
    });
  }

  clear() {
    console.error('清空');
    this.count = 0;
    this.data = [];
  }

  select() {
    this.router.navigateByUrl('/monitor/message');
  }
}
