import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-monitor-email-encryption-decrypt',
  templateUrl: './email-encryption-decrypt.component.html',
})
export class MonitorEmailEncryptionDecryptComponent implements OnInit {

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }


  encryption:string="";
  decrypt:string="";
  tripledes = require("crypto-js/tripledes");
  cryptoJS = require("crypto-js");

  /**
   * 加密
   */
  encryptionClick(){
    if (this.encryption) {
      this.decrypt = this.tripledes.encrypt(this.encryption, 'email').toString();
    }
  }

  /**
   * 解密
   */
  decryptClick(){
    if (this.decrypt) {
      this.encryption = this.tripledes.decrypt(this.decrypt, 'email').toString(this.cryptoJS.enc.Utf8);
    }
  }

  /**
   * 清空内容
   */
  empty(){
    this.encryption="";
    this.decrypt="";
  }

}
