import { Page } from './page';

export class SysAnnouncementSend extends Page{
  id?:string;
  //通告id
  anntId?: string;
  //用户id
  userId?: string;
  //用户名称
  userName?:string;
  //阅读状态
  readFlag?: string;
  //阅读时间
  readTime?: string;

  titile?:string;
  msgContent?:string;
  startTime?:string;
  endTime?:string;
  sender?:string;
  priority?:string;
  msgType?:string;
  sendTime?:string;
  userIds?:string;
  pkOrg?:string;
}
