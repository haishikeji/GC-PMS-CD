import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { UserService } from 'app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { I18NService } from '@core';

@Component({
  selector: 'app-system-update-password',
  templateUrl: './update-password.component.html',
})
export class SystemUpdatePasswordComponent implements OnInit {
  

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private i18NService: I18NService,
    private setting:SettingsService
  ) { }

  ngOnInit() {
    this.userService.queryById(this.setting.user.id).then((response) => {
      this.user.username = response.result.username;
    })
    this.initUsers();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      repassword: [null, [Validators.required, this.confirmationValidator]]
    });
   }

   visible = false;
  validateForm: FormGroup;
  user: any;
  drawerWidth = 600;
  saveLoading = false;

   initUsers() {
    this.user = {
      username: "",
      password: "",
      repassword: ""

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

  md5 = require('js-md5');
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
          // this.close();
          this.saveLoading = false;
        } else {
          this.notification.success(this.i18NService.fanyi("password.change.failed"), response.message);
          this.saveLoading = false;
        }
      })
    }
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
