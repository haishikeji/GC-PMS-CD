import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-basedata-unit-size',
  templateUrl: './unit-size.component.html',
})
export class BasedataUnitSizeComponent implements OnInit {
  
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }


}
