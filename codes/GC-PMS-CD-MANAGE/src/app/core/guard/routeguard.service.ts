import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { MenuService } from '@delon/theme';
@Injectable()
export class RouteguardService implements CanActivate{

  constructor(
    private router: Router,
    private menuService:MenuService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    // var path = route.routeConfig.path;  
    var url = route['_routerState'].url;
    // const nextRoute = ['user','menu','dict','serial-pattern'];
    const menus = this.menuService.menus;
    
    this.getRoutes(menus);

    // console.log(this.links)

    // 当前路由是nextRoute指定页时
    if (this.links.indexOf(url) === -1) {
      // 没有当前连接
      this.router.navigate(['404']);
      return false;
    }else{
      // 判断是否有末级路由
      // if(this.lastLinks.indexOf(path) === -1){
      //   this.router.navigate(['404']);
      //   return false;
      // }
      // 有当前连接
      return true;
    }
  }

  links = [];
  // lastLinks = [];
  getRoutes(menus){
    menus.forEach(e=>{
      if(e.children!=null && e.children.length>0){
        this.getRoutes(e.children);
      }else{
        // console.log(e.link)
        // const linkArr = e.link.split("\/");
        this.links.push(e.link);
        // console.log(linkArr)
        // this.lastLinks.push(linkArr[linkArr.length-1]);//判断末级路由
        // this.links.push(linkArr[linkArr.length-2]);//判断倒数第二级路由
      }
    })
  }

}