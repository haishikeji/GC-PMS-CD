import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';
import { DepartService } from 'app/services/depart.service';
import { Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { StartupService } from '@core';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(
    public settings: SettingsService,
    public departService: DepartService,
    private router: Router,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
  ) {}
  ngOnInit(): void {
    this.getIsOrg();
    this.getOrgList();
  }
  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  isOrg=false;//是否可以切换公司
  /**
   * 处理是否可以切换公司
   */
  getIsOrg(){
    let pkOrgS=this.settings.user.pkOrgS;//用户关联的人员所属公司id
    if(pkOrgS){
      let pkOrgList=pkOrgS.split("、");
      if(pkOrgList.length>1){
        this.isOrg=true;
      }
    }else{//管理员登录
      this.isOrg=true;//
    }
  }

  /**
   * 查询全部公司
   */
  orgList = [];
  getOrgList() {
    this.departService.getByType('1').then(response => {
      if (response.success) {
        this.orgList = response.result;
        this.orgList.forEach(element => {
          if(element.id==this.settings.user.pkOrg){
            sessionStorage.setItem('pkOrg',element.id)
          }
        });
      }
    });
  }

  /**
   * 切换公司
   */
  departName = '';
  orgClick(org) {
    this.departName = org.departName;
    sessionStorage.setItem('pkOrg', org.id);
    // this.startupSrv.load().then(() => {
    //   /*
    //   let url = this.tokenService.referrer!.url || '/dashboard/analysis';
    //   if (url.includes('/passport')) url = '/';
    //   this.router.navigateByUrl(url);
    //   this.notification.remove();
    //   this.notification.success("欢迎 "+res.result.userInfo.username,res.result.timeTag+"好！欢迎回来");*/
      
    //   this.router.navigateByUrl('/dashboard/analysis');
    // });
    //刷新页面
    window.location.reload();
    // 清空路由复用信息
    this.reuseTabService.clear();
    this.router.navigateByUrl('/dashboard/analysis');
    this.router.navigateByUrl("")
    
  }
}
