import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  md5 = require('js-md5');

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private notification: NzNotificationService,
    private eleRef: ElementRef,
  ) {
    this.form = fb.group({
      userName: [null, []],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  ngAfterViewInit() {
    //这里是重点，需要一个定时器，因为一般操作dom都是异步检查详情我会留下参考的链接
    setTimeout(() => {
      this.eleRef.nativeElement.querySelector('.input-left').focus();
    }, 300);
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    console.log(this.password);
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    let url = 'sys/login'; //'/login/account?_allow_anonymous=true'
    this.http
      .post(url, {
        type: this.type,
        username: this.userName.value,
        password: this.md5(this.password.value),
        passwordNotencryption: this.password.value,
      })
      .subscribe((res: any) => {
        //if (res.msg !== 'ok') {
        if (res.code !== 200) {
          this.error = res.message;
          return;
        }
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        //this.tokenService.set(res.user);
        this.tokenService.set(res.result);
        sessionStorage.setItem('pkOrg', '');
        //console.log(res);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          /*
          let url = this.tokenService.referrer!.url || '/dashboard/analysis';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url);
          this.notification.remove();
          this.notification.success("欢迎 "+res.result.userInfo.username,res.result.timeTag+"好！欢迎回来");*/
          this.router.navigateByUrl('/');
        });
      });
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
