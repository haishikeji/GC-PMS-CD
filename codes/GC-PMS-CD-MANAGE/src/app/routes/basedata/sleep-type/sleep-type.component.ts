import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-basedata-sleep-type',
  templateUrl: './sleep-type.component.html',
})
export class BasedataSleepTypeComponent implements OnInit {
  
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

}
