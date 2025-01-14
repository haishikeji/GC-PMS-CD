import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { zip } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWorkplaceComponent implements OnInit {
  notice: any[] = [];
  activities: any[] = [];
  radarData: any[];
  loading = true;

  // region: mock data
  links = [
    {
      title: '操作一',
      href: '',
    },
    {
      title: '操作二',
      href: '',
    },
    {
      title: '操作三',
      href: '',
    },
    {
      title: '操作四',
      href: '',
    },
    {
      title: '操作五',
      href: '',
    },
    {
      title: '操作六',
      href: '',
    },
  ];
  members = [];
  // endregion

  constructor(private http: _HttpClient, public msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    zip(this.http.get('/chart'), this.http.get('/api/notice'), this.http.get('/api/activities')).subscribe(
      ([chart, notice, activities]: [any, any, any]) => {
        this.radarData = chart.radarData;
        this.notice = notice;
        this.activities = activities.map((item: any) => {
          item.template = item.template.split(/@\{([^{}]*)\}/gi).map((key: string) => {
            if (item[key]) return `<a>${item[key].name}</a>`;
            return key;
          });
          return item;
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
    );
  }
}
