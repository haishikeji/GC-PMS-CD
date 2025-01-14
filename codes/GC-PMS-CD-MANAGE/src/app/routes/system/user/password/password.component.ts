import { I18NService } from './../../../../core/i18n/i18n.service';
import { Component, OnInit, ViewChild, EventEmitter, HostListener, Output } from '@angular/core';
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-system-user-password',
  templateUrl: './password.component.html',
  styles: [
    `
    .footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
    }
    `
  ]
})
export class SystemUserPasswordComponent implements OnInit {
  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private i18NService: I18NService
  ) { }

  ngOnInit() {
    this.initUsers();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      repassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }
  md5 = require('js-md5');
  @Output() afterSave = new EventEmitter<{}>();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if (width > 600) {
      this.drawerWidth = 600;
    } else {
      this.drawerWidth = width;
    }
  }
  // isOkLoading = false;
  visible = false;
  validateForm: FormGroup;
  user: any;
  drawerWidth = 600;
  saveLoading = false;

  openPassword(id: string): void {
    this.visible = true;
    this.userService.queryById(id).then((response) => {
      this.user.username = response.result.username;
    })
  }
  close(): void {
    this.visible = false;
    this.initUsers();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].reset();
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  save(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let valid = this.validateForm.valid;
    console.error(this.user)
    if (valid) {
      this.user.password = this.md5(this.user.password);
      this.user.repassword = this.md5(this.user.repassword);
      this.saveLoading = true;
      this.userService.changPassword(this.user).then((response) => {
        if (response.success) {
          this.notification.success(this.i18NService.fanyi("password.has.been.updated"), "");
          this.close();
          this.saveLoading = false;
        } else {
          this.notification.success(this.i18NService.fanyi("password.change.failed"), response.message);
          this.saveLoading = false;
        }
      })
    }
  }
  initUsers() {
    this.user = {
      username: "",
      password: "",
      repassword: ""

    }
  }
}
