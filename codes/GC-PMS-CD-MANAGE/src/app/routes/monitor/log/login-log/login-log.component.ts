import { LogService } from 'app/services/monitor/log.service';
import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { Log } from 'app/entity/monitor/log';

@Component({
  selector: 'app-monitor-log-login-log',
  templateUrl: './login-log.component.html',
})
export class MonitorLogLoginLogComponent implements OnInit {
  
  constructor(private modal: ModalHelper,private logService:LogService) { }

  ngOnInit() {
    this.getLoginLogs(1);
  }

  page = {
    total: 0,
    current: 0
  };
  log:Log = {
    logType : "1"
  };
  listOfMapData = [];

  //获取日志信息
  getLoginLogs(pageNo){
    this.log.pageNo = pageNo;
    this.logService.getLogs(this.log).then((response) => {
      this.listOfMapData = response.result.records;
      this.page.total = response.result.total;
      this.page.current = response.result.current;
    });
  }
  //按页码显示数据
  pageIndexChange(event) {
    this.getLoginLogs(event);
  }
}
