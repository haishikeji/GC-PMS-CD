import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Log } from 'app/entity/monitor/log';
import { LogService } from 'app/services/monitor/log.service';

@Component({
  selector: 'app-monitor-log-operate-log',
  templateUrl: './operate-log.component.html',
})
export class MonitorLogOperateLogComponent implements OnInit {

  constructor(private modal: ModalHelper,private logService:LogService) { }

  ngOnInit(): void {
    this.getOperateLogs(1);
  }
  mapOfExpandData: { [key: string]: boolean } = {};
  log:Log = {
    logType : "2"
  };
  page = {
    total: 0,
    current: 0
  };
  listOfMapData = [];

  //获取日志信息
  getOperateLogs(pageNo){
    this.log.pageNo = pageNo;
    this.logService.getLogs(this.log).then((response) => {
      this.listOfMapData = response.result.records;
      this.page.total = response.result.total;
      this.page.current = response.result.current;
    });
  }
  //按页码显示数据
  pageIndexChange(event) {
    this.getOperateLogs(event);
  }
}
