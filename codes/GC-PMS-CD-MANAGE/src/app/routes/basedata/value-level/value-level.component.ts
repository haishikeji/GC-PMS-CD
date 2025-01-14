import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-basedata-value-level',
  templateUrl: './value-level.component.html',
})
export class BasedataValueLevelComponent implements OnInit {
  

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }


}
