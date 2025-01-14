import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-test-add',
  templateUrl: './add.component.html',
})
export class TestAddComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  close() {
  }
}
