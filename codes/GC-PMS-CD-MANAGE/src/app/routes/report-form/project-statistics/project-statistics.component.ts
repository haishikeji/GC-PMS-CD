import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ProjectStatisticsService } from 'app/services/report-form/project-statistics.service';
import { ReportFormPrintService } from 'app/services/report-form-print.service';

@Component({
  selector: 'app-report-form-project-statistics',
  templateUrl: './project-statistics.component.html',
  styles: [
    `
      
      th{
        background-color:rgb(223, 223, 219) !important;
        font-weight:bold !important;
        border: solid#000 1px;
      }
      td {
        border: solid#000 1px;
      }
    `,
  ],
})
export class ReportFormProjectStatisticsComponent implements OnInit {
  constructor(
    private projectStatisticsService: ProjectStatisticsService,
    private reportFormPrintService: ReportFormPrintService,
  ) {}

  ngOnInit() {}
  isSpinning = false;
  listOfData = [];
  projectStatisticsWhere: any = {}; //查询条件参数

  /**
   * 查询
   */
  getCostAccountingData() {
    return new Promise(resolve => {
      this.projectStatisticsService.getCostAccountingData(this.projectStatisticsWhere).then(response => {
        this.listOfData = response.result;
      });
    });
  }

  /**
   * 查询按钮
   */
  query() {
    this.getCostAccountingData();
  }

  /**
   * 导出按钮
   */
  export() {
    this.reportFormPrintService.getProjectStatistics(this.listOfData);
  }
}
