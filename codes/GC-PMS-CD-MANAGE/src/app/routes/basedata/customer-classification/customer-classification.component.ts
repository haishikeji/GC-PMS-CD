import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzNotificationService } from 'ng-zorro-antd';
import { DictService } from 'app/services/dict.service';
import { I18NService } from '@core';

@Component({
  selector: 'app-basedata-customer-classification',
  templateUrl: './customer-classification.component.html',
})
export class BasedataCustomerClassificationComponent implements OnInit {
  

  constructor(
    private notification: NzNotificationService,
    private dictService: DictService,
    private i18NService: I18NService,
  ) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
