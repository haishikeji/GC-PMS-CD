import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-quality-control-control-bioanalyticalverification',
  templateUrl: './control-bioanalyticalverification.component.html',
})
export class QualityControlControlBioanalyticalverificationComponent implements OnInit {
 
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

 

}
