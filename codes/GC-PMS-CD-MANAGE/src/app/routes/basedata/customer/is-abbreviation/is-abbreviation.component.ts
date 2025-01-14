import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-basedata-customer-is-abbreviation',
  templateUrl: './is-abbreviation.component.html',
})
export class BasedataCustomerIsAbbreviationComponent implements OnInit {

  constructor(
    private modal: NzModalRef
  ) { }

  listOfData:any=[];
  abbreviation="";
  ngOnInit(): void {
  }

  close() {
    this.modal.destroy();
  }
}
