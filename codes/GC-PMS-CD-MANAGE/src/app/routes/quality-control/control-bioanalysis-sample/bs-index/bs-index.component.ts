import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-quality-control-control-bioanalysis-sample-bs-index',
  templateUrl: './bs-index.component.html',
})
export class QualityControlControlBioanalysisSampleBsIndexComponent implements OnInit {

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  // Loading状态
  isLoading = false;

  // 元数据
  listOfAllData = [
    {
      id: 1,
      contractNumber: "WCG19990610",
      qualityControlSheetNumber: "ODSAJQ猪小屁",
      qualityControlSheetDate: "30-Aug-2018",
      type: "Validation data",
      submissionDate: "30-Jul-2018",
    },
    {
      id: 2,
      contractNumber: "WCG19990610",
      qualityControlSheetNumber: "ODSAJQ猪小屁",
      qualityControlSheetDate: "30-Aug-2018",
      type: "Validation data",
      submissionDate: "30-Jul-2018",
    },
    {
      id: 3,
      contractNumber: "WCG19990610",
      qualityControlSheetNumber: "ODSAJQ",
      qualityControlSheetDate: "30-Aug-2018",
      type: "Validation data",
      submissionDate: "30-Jul-2018",
    },
  ];
  // checkbox 是否被选中
  isAllDisplayDataChecked = false;
  // checkbox不确定状态
  isIndeterminate = false;
  // 显示数据列表
  listOfDisplayData: any[] = [];
  // checkbox 是否被选中
  mapOfCheckedId: { [key: string]: boolean } = {};
  // 当前页面展示checkbox改变的回调
  currentPageDataChange($event: Array<{
    id: number; contractNumber: string, qualityControlSheetNumber: string, qualityControlSheetDate: string, type: string, submissionDate: string
  }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  // 选中的回调
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }
  // 全选
  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }



}
