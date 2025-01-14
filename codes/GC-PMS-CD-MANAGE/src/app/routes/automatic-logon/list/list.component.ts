import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, ReuseTabService } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { StartupService } from '@core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-automatic-logon-list',
  templateUrl: './list.component.html',
})
export class AutomaticLogonListComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private router: Router,
    private activateInfo: ActivatedRoute,) { }

    md5 = require('js-md5');
  error = '';
  username = '';
  id = '';
  ngOnInit() {
    //获取OA流跳转地址获取参数
    this.activateInfo.queryParams.subscribe(queryParams => {
      this.username = queryParams.username;
      let url = 'sys/loginByUserName'; //'/login/account?_allow_anonymous=true'
      this.http
        .post(url, {
          type: 0,
          username: this.username,
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
          });
        });
    });
   }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
