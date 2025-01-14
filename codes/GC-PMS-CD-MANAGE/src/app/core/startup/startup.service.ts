import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private i18NService: I18NService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }
  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088

    return new Promise(resolve => {
      //加载翻译信息
      this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`).subscribe(langData => {
        this.translate.setTranslation(this.i18n.defaultLang, langData);
        this.translate.setDefaultLang(this.i18n.defaultLang);
      });

      zip(
        // this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get('sys/ng-alain/getAppData?orgId=' + sessionStorage.getItem('pkOrg')),
        //this.httpClient.get('./assets/tmp/app-data.json')
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([appData]) => {
            resolve(null);
            return [appData];
          }),
        )
        .subscribe(
          ([appData]) => {
            // <<<<<<< HEAD
            //         // setting language data
            //         // this.translate.setTranslation(this.i18n.defaultLang, langData);
            //         // this.translate.setDefaultLang(this.i18n.defaultLang);
            //         // application data
            //         if (appData == null) {
            //           return;
            //         }
            //         const res: any = appData.result;
            //         // 应用信息：包括站点名、描述、年份
            //         this.settingService.setApp(res.app);
            //         // 用户信息：包括姓名、头像、邮箱地址
            //         this.settingService.setUser(res.user);
            //         // ACL：设置权限为全量
            //         //this.aclService.setFull(true);
            //         this.aclService.setAbility(res.perms);
            //         // 初始化菜单
            //         this.menuService.add(res.menu);
            //         // 设置页面标题的后缀
            //         this.titleService.default = '';
            //         this.titleService.suffix = "斑马自动化办公信息系统";
            //       },
            //         () => { },
            //         () => {
            //           resolve(null);
            //         },
            //       );
            // =======
            // setting language data
            // this.translate.setTranslation(this.i18n.defaultLang, langData);
            // this.translate.setDefaultLang(this.i18n.defaultLang);
            // application data
            if (appData == null) {
              return;
            }
            const res: any = appData.result;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(res.user);
            // ACL：设置权限为全量
            //this.aclService.setFull(true);
            this.aclService.setAbility(res.perms);
            // 初始化菜单
            // res.menu.forEach((element) => {
            //   element.children.forEach((e, i) => {
            //     if (i === 8) {
            //       e.children.forEach((ele) => {
            //         console.warn(111111)
            //         ele.children = [];
            //         ele.children = [
            //           ...ele.children,
            //           {
            //             disabled: false,
            //             externalLink: "",
            //             group: true,
            //             i18n: "menu.Log.Management",
            //             icon: { theme: "outline", spin: false, type: "icon", value: "" },
            //             link: "projectMilestones/bioequivalencePretest",
            //             reuse: true,
            //             text: "12312312",
            //             __id: 72,
            //             _aclResult: true,
            //             _depth: 2,
            //             _hidden: false,
            //             _open: false,
            //             _selected: false,
            //             _type: 1,
            //           }
            //         ];
            //       })
            //     }
            //   })
            // });
            // let icon = null;
            // res.menu.forEach((element) => {
            //   element.children.forEach((e, i) => {
            //     if (i === 2) {
            //       icon = e.icon;
            //       console.error("icon")
            //       console.error(icon)
            //     }
            //     // if (e.text === "项目里程碑") {
            //     //   e.children.forEach((cli, index) => {
            //     //     if (cli.text === "生物等效性预试验") {
            //     //       e.children.splice(index, 1);
            //     //       const preliminaryExperiment = cli;
            //     //       preliminaryExperiment.__parent = element;
            //     //       preliminaryExperiment.icon = "anticon anticon-profile";
            //     //       element.children.push(preliminaryExperiment);
            //     //     }
            //     //   })
            //     // }
            //   });
            // });
            // console.error(res.menu)
            this.menuService.add(res.menu);
            sessionStorage.setItem('pkOrg', res.user.pkOrg);
            // 设置页面标题的后缀
            this.titleService.default = '';
            // this.titleService.suffix=this.i18NService.fanyi("app.login.title");
            this.titleService.suffix = '品讯·项目管理软件';
          },
          () => {},
          () => {
            resolve(null);
          },
        );
    });
  }

  getI18nData() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`);
    });
    return p;
  }
  getAppData() {
    var p = new Promise(function(resolve, reject) {
      //做一些异步操作
      this.httpClient.get('sys/ng-alain/getAppData');
    });
    return p;
  }
}
