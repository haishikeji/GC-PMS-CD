import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { getTimeDistance } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { I18NService } from '@core';
import { yuan } from '@shared';
// import { ProjectFileService } from 'app/services/projectFile/project-file.service';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {
  data: any = {};
  // loading = true;
  date_range: Date[] = [];
  rankingListData: any[] = Array(7)
    .fill({})
    .map((item, i) => {
      return {
        title: this.i18n.fanyi('app.analysis.test', { no: i }),
        total: 323234,
      };
    });
  titleMap = {
    y1: this.i18n.fanyi('app.analysis.traffic'),
    y2: this.i18n.fanyi('app.analysis.payments'),
  };
  searchColumn: STColumn[] = [
    { title: '排名', i18n: 'app.analysis.table.rank', index: 'index' },
    {
      title: '搜索关键词',
      i18n: 'app.analysis.table.search-keyword',
      index: 'keyword',
      click: (item: any) => this.msg.success(item.keyword),
    },
    {
      type: 'number',
      title: '用户数',
      i18n: 'app.analysis.table.users',
      index: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      type: 'number',
      title: '周涨幅',
      i18n: 'app.analysis.table.weekly-range',
      index: 'range',
      render: 'range',
      sorter: (a, b) => a.range - b.range,
    },
  ];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private i18n: I18NService,
    private cdr: ChangeDetectorRef, // private projectFileService: ProjectFileService
  ) {}

  ngOnInit() {
    const offlineData: any[] = [];
    for (let i = 0; i < 10; i += 1) {
      offlineData.push({
        name: `门店${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10,
      });
    }
    offlineData.forEach((item: any, idx: number) => {
      item.show = idx === 0;
      item.chart = Object.assign([], offlineData);
    });
    // this.http.get('chart').subscribe((res: any) => {
    //   res.offlineData.forEach((item: any, idx: number) => {
    //     item.show = idx === 0;
    //     item.chart = Object.assign([], res.offlineChartData);
    //   });
    //   this.data = res;
    //   this.loading = false;
    // });
    // this.getCircleChartData();
    // this.feeTotal = `&yen ${this.feeData.reduce((pre, now) => now.y + pre, 0).toFixed(2)}`;
    // this.alertTotal = `&yen ${this.feeData.reduce((pre, now) => now.y + pre, 0).toFixed(2)}`;
  }

  /**
   * @description: 获取数据
   * @param {type}
   * @author: 段亚鑫
   */
  isVisible = false;
  getCircleChartData() {
    // this.projectFileService.queryStatusNum().then((response) => {
    //   this.projectFeeData = response.result.statusList;
    //   this.projectFeeTotal = response.result.sum;
    //   this.isVisible = true;
    //   this.loading = false;
    //   // this.chart.render();
    // })
  }

  /**
   * @description: 渲染图表
   * @param {type}
   * @author: 段亚鑫
   */
  chart: any;
  render(el: ElementRef) {
    const data = [
      {
        item: '事例一',
        count: 40,
        percent: 0.4,
      },
      {
        item: '事例二',
        count: 21,
        percent: 0.21,
      },
      {
        item: '事例三',
        count: 17,
        percent: 0.17,
      },
      {
        item: '事例四',
        count: 13,
        percent: 0.13,
      },
      {
        item: '事例五',
        count: 9,
        percent: 0.09,
      },
    ];
    this.chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 450,
      animate: false,
    });
    this.chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        },
      },
    });
    this.chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });
    this.chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 文本
    this.chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      alignX: 'middle',
      alignY: 'middle',
    });
    const interval = this.chart
      .intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: function formatter(val, item) {
          return item.point.item + ': ' + val;
        },
      })
      .tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    // this.chart.render();
    interval.setSelected(data[0]);
  }

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
    setTimeout(() => this.cdr.detectChanges());
  }

  salesType = 'all';
  salesPieData: any;
  salesTotal = 0;
  changeSaleType() {
    this.salesPieData =
      this.salesType === 'all'
        ? this.data.salesTypeData
        : this.salesType === 'online'
        ? this.data.salesTypeDataOnline
        : this.data.salesTypeDataOffline;
    if (this.salesPieData) {
      this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }
    this.cdr.detectChanges();
  }

  handlePieValueFormat(value: any) {
    return yuan(value);
  }

  saleTabs: any[] = [{ key: 'sales', show: true }, { key: 'visits' }];
  salesChange(idx: number) {
    if (this.saleTabs[idx].show !== true) {
      this.saleTabs[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  offlineIdx = 0;
  offlineChange(idx: number) {
    if (this.data.offlineData[idx].show !== true) {
      this.data.offlineData[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  projectFeeTotal: any = null;
  projectFeeData = [
    // {x:'试剂/PD01',y:5.0,},
    // {x:'试剂/PDA',y:2.5,},
    // {x:'试剂/PR02',y:1.5,},
    // {x:'检测/PD01',y:5.5,},
    // {x:'检测/PDA',y:2.2,},
    // {x:'检测/PR02',y:1.6,},
    // {x:'会议/PD01',y:0.8,},
    // {x:'会议/PDA',y:3.2,},
    // {x:'会议/PR02',y:1.5,},
    // {x:'培训/PD01',y:2.5,},
    // {x:'培训/PDA',y:7.6,},
    // {x:'培训/PR02',y:1.8,},
    // {x:'会议/PD01',y:0.8,},
    // {x:'会议/PDA',y:3.2,},
    // {x:'人工/PR02',y:4.2,},
  ];
  projectFeeFormat(val: number) {
    // console.error(val)
    return val + '/个';
  }

  feeTotal: string;
  feeData = [
    { x: '一季度', y: 10000 },
    { x: '二季度', y: 40000 },
    { x: '三季度', y: 80000 },
    { x: '四季度', y: 30000 },
  ];
  feeFormat(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }

  alertTotal: string;
  alertData = [
    { x: '办公费', y: 8000 },
    { x: '检测费', y: 12000 },
    { x: '设备采购费', y: 66000 },
    { x: '培训费', y: 45000 },
  ];
  alertFormat(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }
}
