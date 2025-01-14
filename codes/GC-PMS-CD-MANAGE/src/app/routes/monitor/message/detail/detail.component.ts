import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AnnountCementSendService } from 'app/services/sys-announcement-send.service';

@Component({
  selector: 'app-monitor-message-detail',
  templateUrl: './detail.component.html',
})
export class MonitorMessageDetailComponent implements OnInit {

  constructor(private http: _HttpClient, private annountCementSendService: AnnountCementSendService) { }

  ngOnInit() {
    console.error(this.data)
    if (this.data.readFlag !== "1") {
      this.isReading();
    }
  }

  data = null;


  isReading() {
    this.annountCementSendService.updateReadFlagById(this.data.id).then((response) => {
      console.error(response)
    })
  }


}
