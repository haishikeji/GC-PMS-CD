import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

const CODEMESSAGE = {
  0: '服务器发生错误，请检查服务器。',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private msg: NzMessageService) { }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }
    if (ev.status === 500 && ev["error"].message === "Token失效，请重新登录") {
      return;
    }
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    //防止重复提交时，返回状态为undefined
    if (ev.status === undefined) {
      return;
    }
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      // case 0:
      //   (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
      //   this.goTo('/passport/login');
      //   break;
      case 200:
        console.log(ev)
        if (ev instanceof HttpResponse) {
          const body: any = ev.body;
          // console.log((body.success != undefined && !body.success ))
          if (body && (body.success != undefined && !body.success)) {
            this.msg.error(body.message);
            //console.log(body.code)
            // return throwError(body);
            return of(ev);
          } else {
            return of(ev);
          }
        } else {
          return of(ev);
        }
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (ev instanceof HttpResponse) {
        //     const body: any = ev.body;
        //     if (body && !body.success) {
        //         this.msg.error(body.message);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码

        //        return of(new HttpResponse(Object.assign(event, { body: body.result })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 401:
        // this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        // 清空 token 信息
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo('/passport/login');
        break;
      case 403:
      case 404:
      case 500:
        if (ev["error"].message === "Token失效，请重新登录") {
          // this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
          // 清空 token 信息
          (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
          this.goTo('/passport/login');
        } else {
          this.goTo(`/exception/${ev.status}`);
        }
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    var subUrl = url.substring(url.length - 5, url.length);
    if (subUrl != ".json") {
      if (!url.startsWith('https://') && !url.startsWith('http://')) {
        url = environment.SERVER_URL + url;
      }
    }
    console.log("访问地址：" + url);
    const newReq = req.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
